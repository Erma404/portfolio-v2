// Drawing model for the hero doodle board: every mark is an object (stroke,
// shape or text) so it can be selected, moved, erased and filled.

export type Point = { x: number; y: number };

export type ShapeKind = "rect" | "square" | "circle" | "hexagon" | "star" | "arrow" | "rounded";

export type StrokeItem = { id: string; type: "stroke"; color: string; size: number; points: Point[] };
export type ShapeItem = {
  id: string;
  type: "shape";
  shape: ShapeKind;
  color: string;
  fill: string | null;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};
export type TextItem = { id: string; type: "text"; color: string; x: number; y: number; value: string };
export type Item = StrokeItem | ShapeItem | TextItem;

export type Board = { items: Item[]; background: string | null };

export const EMPTY_BOARD: Board = { items: [], background: null };

export const PALETTE = [
  "#1c1c1c",
  "#e8622c",
  "#e5412d",
  "#9b2a4f",
  "#7b1fb0",
  "#3606a0",
  "#1f4ef5",
  "#4492cc",
  "#7bb04b",
  "#d6e556",
  "#f2c440",
  "#f39c38",
];

export const SHAPES: ShapeKind[] = ["rect", "square", "circle", "hexagon", "star", "arrow", "rounded"];

// Canvas can't read CSS variables, so resolve the site's Inter family once.
let textFont: string | null = null;
export function getTextFont() {
  if (textFont) return textFont;
  const family =
    typeof document === "undefined"
      ? ""
      : getComputedStyle(document.documentElement).getPropertyValue("--font-inter").trim();
  textFont = `600 22px ${family || "system-ui"}, sans-serif`;
  return textFont;
}
const TEXT_LINE = 26;
export const STROKE_SIZE = 3;

export function uid() {
  return Math.random().toString(36).slice(2, 10);
}

/** Normalised box of a shape; squares keep equal sides in the drag direction. */
export function shapeBox(s: ShapeItem) {
  let { x2, y2 } = s;
  if (s.shape === "square") {
    const side = Math.max(Math.abs(x2 - s.x1), Math.abs(y2 - s.y1));
    x2 = s.x1 + Math.sign(x2 - s.x1 || 1) * side;
    y2 = s.y1 + Math.sign(y2 - s.y1 || 1) * side;
  }
  return {
    x: Math.min(s.x1, x2),
    y: Math.min(s.y1, y2),
    w: Math.abs(x2 - s.x1),
    h: Math.abs(y2 - s.y1),
  };
}

let measureCtx: CanvasRenderingContext2D | null = null;
function textWidth(value: string) {
  if (typeof document === "undefined") return value.length * 11;
  measureCtx ??= document.createElement("canvas").getContext("2d");
  if (!measureCtx) return value.length * 11;
  measureCtx.font = getTextFont();
  return Math.max(...value.split("\n").map((line) => measureCtx!.measureText(line).width));
}

export function itemBounds(item: Item) {
  if (item.type === "shape") return shapeBox(item);
  if (item.type === "text") {
    const lines = item.value.split("\n").length;
    return { x: item.x, y: item.y, w: textWidth(item.value), h: lines * TEXT_LINE };
  }
  const xs = item.points.map((p) => p.x);
  const ys = item.points.map((p) => p.y);
  const x = Math.min(...xs);
  const y = Math.min(...ys);
  return { x, y, w: Math.max(...xs) - x, h: Math.max(...ys) - y };
}

function distToSegment(p: Point, a: Point, b: Point) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = dx * dx + dy * dy;
  const t = len ? Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / len)) : 0;
  return Math.hypot(p.x - (a.x + t * dx), p.y - (a.y + t * dy));
}

/** Topmost item under a point (with a little tolerance), or null. */
export function hitTest(items: Item[], p: Point, tolerance = 8): Item | null {
  for (let i = items.length - 1; i >= 0; i--) {
    const item = items[i];
    if (item.type === "stroke") {
      const pts = item.points;
      const reach = item.size / 2 + tolerance;
      if (pts.length === 1 && Math.hypot(p.x - pts[0].x, p.y - pts[0].y) <= reach) return item;
      for (let j = 1; j < pts.length; j++) {
        if (distToSegment(p, pts[j - 1], pts[j]) <= reach) return item;
      }
    } else if (item.type === "shape" && item.shape === "arrow") {
      if (distToSegment(p, { x: item.x1, y: item.y1 }, { x: item.x2, y: item.y2 }) <= tolerance + 4) return item;
    } else {
      const b = itemBounds(item);
      if (
        p.x >= b.x - tolerance &&
        p.x <= b.x + b.w + tolerance &&
        p.y >= b.y - tolerance &&
        p.y <= b.y + b.h + tolerance
      ) {
        return item;
      }
    }
  }
  return null;
}

export function moveItem(item: Item, dx: number, dy: number): Item {
  if (item.type === "stroke") return { ...item, points: item.points.map((p) => ({ x: p.x + dx, y: p.y + dy })) };
  if (item.type === "text") return { ...item, x: item.x + dx, y: item.y + dy };
  return { ...item, x1: item.x1 + dx, y1: item.y1 + dy, x2: item.x2 + dx, y2: item.y2 + dy };
}

function tracePolygon(ctx: CanvasRenderingContext2D, points: Point[]) {
  ctx.beginPath();
  points.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
  ctx.closePath();
}

function traceShape(ctx: CanvasRenderingContext2D, s: ShapeItem) {
  const { x, y, w, h } = shapeBox(s);
  const cx = x + w / 2;
  const cy = y + h / 2;
  switch (s.shape) {
    case "rect":
    case "square":
      ctx.beginPath();
      ctx.rect(x, y, w, h);
      return;
    case "rounded":
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, Math.min(18, w / 2, h / 2));
      return;
    case "circle":
      ctx.beginPath();
      ctx.ellipse(cx, cy, w / 2, h / 2, 0, 0, Math.PI * 2);
      return;
    case "hexagon":
      tracePolygon(
        ctx,
        Array.from({ length: 6 }, (_, i) => {
          const a = (Math.PI / 3) * i;
          return { x: cx + (w / 2) * Math.cos(a), y: cy + (h / 2) * Math.sin(a) };
        }),
      );
      return;
    case "star":
      tracePolygon(
        ctx,
        Array.from({ length: 10 }, (_, i) => {
          const a = -Math.PI / 2 + (Math.PI / 5) * i;
          const r = i % 2 ? 0.45 : 1;
          return { x: cx + (w / 2) * r * Math.cos(a), y: cy + (h / 2) * r * Math.sin(a) };
        }),
      );
      return;
    case "arrow": {
      const angle = Math.atan2(s.y2 - s.y1, s.x2 - s.x1);
      const head = 14;
      ctx.beginPath();
      ctx.moveTo(s.x1, s.y1);
      ctx.lineTo(s.x2, s.y2);
      ctx.moveTo(s.x2, s.y2);
      ctx.lineTo(s.x2 - head * Math.cos(angle - Math.PI / 6), s.y2 - head * Math.sin(angle - Math.PI / 6));
      ctx.moveTo(s.x2, s.y2);
      ctx.lineTo(s.x2 - head * Math.cos(angle + Math.PI / 6), s.y2 - head * Math.sin(angle + Math.PI / 6));
      return;
    }
  }
}

export function drawItem(ctx: CanvasRenderingContext2D, item: Item) {
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  if (item.type === "stroke") {
    ctx.strokeStyle = item.color;
    ctx.lineWidth = item.size;
    ctx.beginPath();
    const [first, ...rest] = item.points;
    ctx.moveTo(first.x, first.y);
    if (rest.length === 0) ctx.lineTo(first.x + 0.01, first.y);
    rest.forEach((p) => ctx.lineTo(p.x, p.y));
    ctx.stroke();
  } else if (item.type === "shape") {
    traceShape(ctx, item);
    if (item.fill && item.shape !== "arrow") {
      ctx.fillStyle = item.fill;
      ctx.fill();
    }
    ctx.strokeStyle = item.color;
    ctx.lineWidth = STROKE_SIZE;
    ctx.stroke();
  } else {
    ctx.fillStyle = item.color;
    ctx.font = getTextFont();
    ctx.textBaseline = "top";
    item.value.split("\n").forEach((line, i) => ctx.fillText(line, item.x, item.y + i * TEXT_LINE));
  }
}

export function drawSelection(ctx: CanvasRenderingContext2D, item: Item) {
  const b = itemBounds(item);
  ctx.save();
  ctx.setLineDash([5, 4]);
  ctx.strokeStyle = "#3b82f6";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(b.x - 6, b.y - 6, b.w + 12, b.h + 12);
  ctx.restore();
}

export function isBoard(value: unknown): value is Board {
  return (
    typeof value === "object" &&
    value !== null &&
    Array.isArray((value as Board).items) &&
    ((value as Board).background === null || typeof (value as Board).background === "string")
  );
}
