"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDictionary } from "@/i18n/provider";

type Point = { x: number; y: number };
type Stroke = {
  kind: "draw" | "erase";
  color: string;
  size: number;
  points: Point[];
};
type TextItem = { x: number; y: number; value: string; color: string };
type BoardState = { strokes: Stroke[]; texts: TextItem[] };

type Tool = "select" | "pencil" | "text";
// The eraser is a one-shot action (clears the board), not a drawing mode.
type ToolbarItem = Tool | "eraser";

const COLORS = ["#111111", "#16412f", "#f5824f", "#a39ef9"];
const STORAGE_KEY = "portfolio-doodle-v1";
const EMPTY_STATE: BoardState = { strokes: [], texts: [] };

function loadInitialState(): BoardState {
  if (typeof window === "undefined") return EMPTY_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_STATE;
    const parsed = JSON.parse(raw);
    if (parsed && Array.isArray(parsed.strokes) && Array.isArray(parsed.texts)) {
      return parsed as BoardState;
    }
  } catch {
    // ignore corrupt storage
  }
  return EMPTY_STATE;
}

export function DoodleCanvas() {
  const { doodle } = useDictionary();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const drawingRef = useRef<Stroke | null>(null);
  const isPointerDown = useRef(false);

  const [tool, setTool] = useState<Tool>("pencil");
  const [color, setColor] = useState(COLORS[0]);
  // Safe to read storage here: the canvas is only ever rendered on the client
  // (see the `ssr: false` import in hero.tsx), so there is no hydration pass.
  const [current, setCurrent] = useState<BoardState>(loadInitialState);
  const [past, setPast] = useState<BoardState[]>([]);
  const [future, setFuture] = useState<BoardState[]>([]);
  const [pendingText, setPendingText] = useState<{ x: number; y: number } | null>(null);
  const [textDraft, setTextDraft] = useState("");

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    } catch {
      // storage unavailable, ignore
    }
  }, [current]);

  const commit = useCallback(
    (next: BoardState) => {
      setPast((p) => [...p, current]);
      setCurrent(next);
      setFuture([]);
    },
    [current]
  );

  const undo = useCallback(() => {
    setPast((p) => {
      if (p.length === 0) return p;
      const prev = p[p.length - 1];
      setFuture((f) => [current, ...f]);
      setCurrent(prev);
      return p.slice(0, -1);
    });
  }, [current]);

  const redo = useCallback(() => {
    setFuture((f) => {
      if (f.length === 0) return f;
      const next = f[0];
      setPast((p) => [...p, current]);
      setCurrent(next);
      return f.slice(1);
    });
  }, [current]);

  const clearAll = useCallback(() => {
    commit(EMPTY_STATE);
  }, [commit]);

  const redraw = useCallback((live?: Stroke | null) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.width / dpr;
    const height = canvas.height / dpr;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    const allStrokes = live ? [...current.strokes, live] : current.strokes;
    for (const stroke of allStrokes) {
      if (stroke.points.length < 1) continue;
      ctx.globalCompositeOperation =
        stroke.kind === "erase" ? "destination-out" : "source-over";
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.size;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      const [first, ...rest] = stroke.points;
      ctx.moveTo(first.x, first.y);
      if (rest.length === 0) {
        ctx.lineTo(first.x + 0.1, first.y + 0.1);
      }
      for (const point of rest) {
        ctx.lineTo(point.x, point.y);
      }
      ctx.stroke();
    }
    ctx.globalCompositeOperation = "source-over";
  }, [current]);

  useEffect(() => {
    redraw();
  }, [redraw]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      redraw();
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    return () => observer.disconnect();
  }, [redraw]);

  const getPoint = (e: React.PointerEvent<HTMLCanvasElement>): Point => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const point = getPoint(e);

    if (tool === "text") {
      setPendingText(point);
      setTextDraft("");
      return;
    }
    if (tool === "select") return;

    isPointerDown.current = true;
    drawingRef.current = {
      kind: "draw",
      color,
      size: 3,
      points: [point],
    };
    canvasRef.current?.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isPointerDown.current || !drawingRef.current) return;
    const point = getPoint(e);
    drawingRef.current.points.push(point);
    redraw(drawingRef.current);
  };

  const handlePointerUp = () => {
    if (!isPointerDown.current || !drawingRef.current) return;
    isPointerDown.current = false;
    const finished = drawingRef.current;
    drawingRef.current = null;
    commit({ ...current, strokes: [...current.strokes, finished] });
  };

  const commitText = () => {
    if (pendingText && textDraft.trim()) {
      commit({
        ...current,
        texts: [
          ...current.texts,
          { x: pendingText.x, y: pendingText.y, value: textDraft.trim(), color },
        ],
      });
    }
    setPendingText(null);
    setTextDraft("");
  };

  const tools: { id: ToolbarItem; label: string; icon: React.ReactNode }[] = useMemo(
    () => [
      {
        id: "select",
        label: doodle.select,
        icon: (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 2l9.5 5.2-4 1.1-1.1 4L3 2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
          </svg>
        ),
      },
      {
        id: "pencil",
        label: doodle.pencil,
        icon: (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M11 2.5 13.5 5 5 13.5 2 14l.5-3L11 2.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
          </svg>
        ),
      },
      {
        id: "eraser",
        label: doodle.clear,
        icon: (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M9.5 2.5 13 6l-6 6H4L1.5 9.5l6-6.3a1 1 0 0 1 2 0Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
            <path d="M4 12h9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
        ),
      },
      {
        id: "text",
        label: doodle.text,
        icon: (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 3.5h10M8 3.5V13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
        ),
      },
    ],
    [doodle]
  );

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
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          style={{ cursor: tool === "select" ? "default" : "crosshair" }}
        />

        {current.texts.map((t, i) => (
          <span
            key={i}
            className="font-hand pointer-events-none absolute text-xl"
            style={{ left: t.x, top: t.y - 14, color: t.color }}
          >
            {t.value}
          </span>
        ))}

        {pendingText && (
          <input
            autoFocus
            aria-label={doodle.textPlaceholder}
            value={textDraft}
            onChange={(e) => setTextDraft(e.target.value)}
            onBlur={commitText}
            onKeyDown={(e) => {
              if (e.key === "Enter") commitText();
              if (e.key === "Escape") {
                setPendingText(null);
                setTextDraft("");
              }
            }}
            className="font-hand absolute z-10 border-b border-dashed border-foreground/40 bg-transparent text-xl outline-none"
            style={{ left: pendingText.x, top: pendingText.y - 20, color }}
          />
        )}

        <div className="pointer-events-none absolute inset-x-0 top-3 z-20 flex justify-center">
          <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-black/5 bg-white/95 p-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.08)] backdrop-blur">
            {tools.map((t) => (
              <button
                key={t.id}
                type="button"
                aria-label={t.label}
                aria-pressed={t.id === "eraser" ? undefined : tool === t.id}
                onClick={() => (t.id === "eraser" ? clearAll() : setTool(t.id))}
                className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors sm:h-8 sm:w-8 ${
                  tool === t.id
                    ? "bg-accent-soft text-accent"
                    : "text-foreground/50 hover:text-foreground"
                }`}
              >
                {t.icon}
              </button>
            ))}

            <span className="mx-1 h-5 w-px bg-border" />

            <button
              type="button"
              aria-label={doodle.color}
              onClick={() =>
                setColor((c) => COLORS[(COLORS.indexOf(c) + 1) % COLORS.length])
              }
              className="flex h-7 w-7 items-center justify-center rounded-full sm:h-8 sm:w-8"
            >
              <span
                className="h-4 w-4 rounded-full border border-black/20"
                style={{ backgroundColor: color }}
              />
            </button>

            <span className="mx-1 h-5 w-px bg-border" />

            <button
              type="button"
              aria-label={doodle.undo}
              disabled={past.length === 0}
              onClick={undo}
              className="flex h-7 w-7 items-center justify-center rounded-full text-foreground/50 transition-colors hover:text-foreground disabled:opacity-30 sm:h-8 sm:w-8"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 6H11a3.5 3.5 0 0 1 0 7H7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                <path d="M6.5 3.5 4 6l2.5 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              aria-label={doodle.redo}
              disabled={future.length === 0}
              onClick={redo}
              className="flex h-7 w-7 items-center justify-center rounded-full text-foreground/50 transition-colors hover:text-foreground disabled:opacity-30 sm:h-8 sm:w-8"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M12 6H5a3.5 3.5 0 0 0 0 7h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                <path d="M9.5 3.5 12 6l-2.5 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
