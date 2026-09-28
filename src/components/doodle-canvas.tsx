"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { useDictionary } from "@/i18n/provider";
import {
  EMPTY_BOARD,
  PALETTE,
  SHAPES,
  STROKE_SIZE,
  drawItem,
  drawSelection,
  getTextFont,
  hitTest,
  moveItem,
  uid,
  type Board,
  type Item,
  type Point,
  type ShapeKind,
} from "@/components/doodle/model";
import {
  EraserIcon,
  FillIcon,
  PencilIcon,
  RedoIcon,
  SelectIcon,
  ShapeGlyph,
  ShapesIcon,
  TextIcon,
  UndoIcon,
} from "@/components/doodle/icons";

// The eraser is a one-shot action (clears the board), not a drawing mode.
type Tool = "select" | "draw" | "shape" | "text" | "fill";
type Menu = "shapes" | "colors" | null;

// Drawings used to be saved in the browser; the board now starts empty on every
// visit, so leftovers from those versions are removed.
const LEGACY_STORAGE_KEYS = ["portfolio-doodle-v1", "portfolio-doodle-v2"];

/** Shape dropped by a simple click: 120×80 (90×90 for square, circle and star). */
function defaultShapeAt(item: Item & { type: "shape" }): Item & { type: "shape" } {
  const { x1: x, y1: y } = item;
  if (item.shape === "arrow") return { ...item, x1: x - 60, y1: y, x2: x + 60, y2: y };
  const even = item.shape === "square" || item.shape === "circle" || item.shape === "star";
  const w = even ? 90 : 120;
  const h = even ? 90 : 80;
  return { ...item, x1: x - w / 2, y1: y - h / 2, x2: x + w / 2, y2: y + h / 2 };
}

/** In-progress gesture, kept in a ref so pointer moves don't re-render React. */
type Gesture =
  | { kind: "draw"; item: Item & { type: "stroke" } }
  | { kind: "shape"; item: Item & { type: "shape" } }
  | { kind: "move"; id: string; from: Point; dx: number; dy: number };

function ToolButton({
  label,
  active,
  onClick,
  disabled,
  children,
  hasMenu,
}: {
  label: string;
  active?: boolean;
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
  hasMenu?: boolean;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active === undefined ? undefined : active}
      aria-haspopup={hasMenu ? "true" : undefined}
      disabled={disabled}
      onClick={onClick}
      className={`grid h-9 w-9 place-items-center rounded-[10px] transition-colors disabled:cursor-default disabled:opacity-35 ${
        active ? "bg-black/[0.07]" : "hover:bg-black/[0.04]"
      }`}
    >
      {children}
    </button>
  );
}

export function DoodleCanvas() {
  const { doodle } = useDictionary();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const gesture = useRef<Gesture | null>(null);

  const [tool, setTool] = useState<Tool>("draw");
  const [shape, setShape] = useState<ShapeKind>("rect");
  const [color, setColor] = useState(PALETTE[0]);
  const [menu, setMenu] = useState<Menu>(null);
  // Always starts empty: nothing is kept between visits.
  const [board, setBoard] = useState<Board>(EMPTY_BOARD);
  const [past, setPast] = useState<Board[]>([]);
  const [future, setFuture] = useState<Board[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [draftText, setDraftText] = useState<{ x: number; y: number; value: string } | null>(null);

  // Latest board for pointer handlers; synced before the paint effects run.
  const boardRef = useRef(board);
  useLayoutEffect(() => {
    boardRef.current = board;
  }, [board]);

  useEffect(() => {
    try {
      LEGACY_STORAGE_KEYS.forEach((key) => window.localStorage.removeItem(key));
    } catch {
      // storage unavailable
    }
  }, []);

  const commit = useCallback((next: Board) => {
    setPast((p) => [...p.slice(-60), boardRef.current]);
    setFuture([]);
    setBoard(next);
  }, []);

  const undo = useCallback(() => {
    setPast((p) => {
      if (!p.length) return p;
      setFuture((f) => [boardRef.current, ...f]);
      setBoard(p[p.length - 1]);
      return p.slice(0, -1);
    });
    setSelected(null);
  }, []);

  const redo = useCallback(() => {
    setFuture((f) => {
      if (!f.length) return f;
      setPast((p) => [...p, boardRef.current]);
      setBoard(f[0]);
      return f.slice(1);
    });
    setSelected(null);
  }, []);

  // --- Rendering --------------------------------------------------------------

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const dpr = window.devicePixelRatio || 1;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const current = boardRef.current;
    if (current.background) {
      ctx.fillStyle = current.background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    const g = gesture.current;
    for (const item of current.items) {
      const shown = g?.kind === "move" && g.id === item.id ? moveItem(item, g.dx, g.dy) : item;
      drawItem(ctx, shown);
      if (item.id === selected) drawSelection(ctx, shown);
    }
    if (g?.kind === "draw" || g?.kind === "shape") drawItem(ctx, g.item);
  }, [selected]);

  useEffect(() => {
    render();
  }, [board, render]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      render();
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    // Web fonts may land after the first paint of text items.
    document.fonts?.ready.then(render);
    return () => observer.disconnect();
  }, [render]);

  // --- Keyboard ---------------------------------------------------------------

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement | null)?.closest("input, textarea, [contenteditable]");
      if (typing) return;
      if (e.key === "Escape") setMenu(null);
      if (!containerRef.current?.contains(document.activeElement) && document.activeElement !== document.body) return;
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "z") {
        e.preventDefault();
        if (e.shiftKey) redo();
        else undo();
      } else if ((e.key === "Delete" || e.key === "Backspace") && selected) {
        e.preventDefault();
        commit({ ...boardRef.current, items: boardRef.current.items.filter((i) => i.id !== selected) });
        setSelected(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [commit, redo, undo, selected]);

  // --- Pointer ----------------------------------------------------------------

  const pointFrom = (e: React.PointerEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const commitText = useCallback(() => {
    setDraftText((draft) => {
      if (draft && draft.value.trim()) {
        commit({
          ...boardRef.current,
          items: [...boardRef.current.items, { id: uid(), type: "text", color, x: draft.x, y: draft.y, value: draft.value.trimEnd() }],
        });
      }
      return null;
    });
  }, [color, commit]);

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    setMenu(null);
    const p = pointFrom(e);
    const items = boardRef.current.items;

    if (tool === "text") {
      // Let the pointerdown finish first so the new textarea keeps focus.
      e.preventDefault();
      if (draftText) commitText();
      setDraftText({ x: p.x, y: p.y - 4, value: "" });
      return;
    }

    if (tool === "fill") {
      const hit = hitTest(items, p);
      if (hit?.type === "shape" && hit.shape !== "arrow") {
        commit({ ...boardRef.current, items: items.map((i) => (i.id === hit.id ? { ...hit, fill: color } : i)) });
      } else if (!hit) {
        commit({ ...boardRef.current, background: color });
      }
      return;
    }

    if (tool === "select") {
      const hit = hitTest(items, p);
      setSelected(hit?.id ?? null);
      if (!hit) return;
      gesture.current = { kind: "move", id: hit.id, from: p, dx: 0, dy: 0 };
    } else if (tool === "draw") {
      gesture.current = { kind: "draw", item: { id: uid(), type: "stroke", color, size: STROKE_SIZE, points: [p] } };
    } else if (tool === "shape") {
      gesture.current = {
        kind: "shape",
        item: { id: uid(), type: "shape", shape, color, fill: null, x1: p.x, y1: p.y, x2: p.x, y2: p.y },
      };
    }
    canvasRef.current?.setPointerCapture(e.pointerId);
    render();
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const g = gesture.current;
    if (!g) return;
    const p = pointFrom(e);
    if (g.kind === "draw") g.item.points.push(p);
    else if (g.kind === "shape") {
      g.item.x2 = p.x;
      g.item.y2 = p.y;
    } else if (g.kind === "move") {
      g.dx = p.x - g.from.x;
      g.dy = p.y - g.from.y;
    }
    render();
  };

  const onPointerUp = () => {
    const g = gesture.current;
    gesture.current = null;
    if (!g) return;
    const current = boardRef.current;
    if (g.kind === "draw") commit({ ...current, items: [...current.items, g.item] });
    else if (g.kind === "shape") {
      const dragged = Math.abs(g.item.x2 - g.item.x1) > 4 || Math.abs(g.item.y2 - g.item.y1) > 4;
      // A plain click drops a default-size shape centred on the pointer.
      const item = dragged ? g.item : defaultShapeAt(g.item);
      commit({ ...current, items: [...current.items, item] });
    } else if (g.kind === "move") {
      if (g.dx || g.dy) {
        commit({ ...current, items: current.items.map((i) => (i.id === g.id ? moveItem(i, g.dx, g.dy) : i)) });
      } else render();
    }
  };

  useEffect(() => {
    if (draftText) textRef.current?.focus();
  }, [draftText]);

  const pickTool = (next: Tool) => {
    if (draftText) commitText();
    setTool(next);
    if (next !== "select") setSelected(null);
    setMenu(next === "shape" ? (menu === "shapes" ? null : "shapes") : null);
  };

  const cursor =
    tool === "text" ? "text" : tool === "select" ? "default" : tool === "fill" ? "pointer" : "crosshair";

  return (
    <div className="relative mx-auto mt-4 w-full max-w-[860px] sm:mt-6">
      <div
        ref={containerRef}
        className="relative h-[300px] w-full overflow-hidden rounded-[1.5rem] border border-black/5 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.06)] sm:h-[380px]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.14) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full touch-none"
          style={{ cursor }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        />

        {draftText && (
          <textarea
            ref={textRef}
            value={draftText.value}
            placeholder={doodle.textPlaceholder}
            aria-label={doodle.text}
            rows={1}
            onChange={(e) => setDraftText({ ...draftText, value: e.target.value })}
            onBlur={commitText}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                commitText();
              }
              if (e.key === "Escape") setDraftText(null);
            }}
            className="absolute z-10 min-w-[10rem] resize-none overflow-hidden border-0 bg-transparent p-0 leading-[26px] outline-none placeholder:text-black/30"
            style={{ left: draftText.x, top: draftText.y, color, font: getTextFont(), height: 26 * (draftText.value.split("\n").length) }}
          />
        )}

        {/* Toolbar */}
        <div className="pointer-events-none absolute inset-x-0 top-3 z-20 flex flex-col items-center gap-2 px-3">
          <div className="pointer-events-auto flex max-w-full items-center gap-0.5 overflow-x-auto rounded-2xl bg-[#faf9f5] p-1.5 shadow-[0_2px_20px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.04)]">
            <ToolButton label={doodle.select} active={tool === "select"} onClick={() => pickTool("select")}>
              <SelectIcon />
            </ToolButton>
            <ToolButton label={doodle.pencil} active={tool === "draw"} onClick={() => pickTool("draw")}>
              <PencilIcon />
            </ToolButton>
            {/* One click wipes the whole board (undo brings it back). */}
            <ToolButton
              label={doodle.clear}
              disabled={!board.items.length && !board.background}
              onClick={() => {
                if (draftText) setDraftText(null);
                commit(EMPTY_BOARD);
                setSelected(null);
                setMenu(null);
              }}
            >
              <EraserIcon />
            </ToolButton>
            <span className="mx-1 h-5 w-px bg-black/10" />
            <ToolButton label={doodle.shape} active={tool === "shape"} hasMenu onClick={() => pickTool("shape")}>
              <ShapesIcon />
            </ToolButton>
            <ToolButton label={doodle.text} active={tool === "text"} onClick={() => pickTool("text")}>
              <TextIcon />
            </ToolButton>
            <ToolButton label={doodle.fill} active={tool === "fill"} onClick={() => pickTool("fill")}>
              <FillIcon />
            </ToolButton>
            <span className="mx-1 h-5 w-px bg-black/10" />
            <button
              type="button"
              title={doodle.color}
              aria-label={doodle.color}
              aria-haspopup="true"
              aria-expanded={menu === "colors"}
              onClick={() => setMenu(menu === "colors" ? null : "colors")}
              className="grid h-9 w-9 place-items-center rounded-[10px] hover:bg-black/[0.04]"
            >
              <span className="h-6 w-6 rounded-[7px] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.12)]" style={{ backgroundColor: color }} />
            </button>
            <span className="mx-1 h-5 w-px bg-black/10" />
            <ToolButton label={doodle.undo} disabled={!past.length} onClick={undo}>
              <UndoIcon />
            </ToolButton>
            <ToolButton label={doodle.redo} disabled={!future.length} onClick={redo}>
              <RedoIcon />
            </ToolButton>
          </div>

          {menu === "shapes" && (
            <div
              role="group"
              aria-label={doodle.shape}
              className="pointer-events-auto flex items-center gap-0.5 rounded-2xl bg-[#faf9f5] p-1.5 shadow-[0_2px_20px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.04)]"
            >
              {SHAPES.map((kind) => (
                <ToolButton
                  key={kind}
                  label={doodle.shapes[kind]}
                  active={shape === kind}
                  onClick={() => {
                    setShape(kind);
                    setTool("shape");
                    setMenu(null);
                  }}
                >
                  <ShapeGlyph shape={kind} />
                </ToolButton>
              ))}
            </div>
          )}

          {menu === "colors" && (
            <div
              role="group"
              aria-label={doodle.color}
              className="pointer-events-auto flex max-w-full flex-wrap items-center justify-center gap-1.5 rounded-2xl bg-[#faf9f5] p-2 shadow-[0_2px_20px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.04)]"
            >
              {PALETTE.map((swatch) => (
                <button
                  key={swatch}
                  type="button"
                  aria-label={swatch}
                  aria-pressed={swatch === color}
                  onClick={() => {
                    setColor(swatch);
                    setMenu(null);
                  }}
                  className="grid h-7 w-7 place-items-center rounded-[8px] transition-transform hover:scale-110"
                  style={{ backgroundColor: swatch === color ? "transparent" : swatch }}
                >
                  {swatch === color && <span className="h-4 w-4 rounded-[5px]" style={{ backgroundColor: swatch }} />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
