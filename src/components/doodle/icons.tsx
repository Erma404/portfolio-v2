// Small hand-drawn toolbar icons for the doodle board (20×20 viewBox).
import type { ShapeKind } from "./model";

const S = { width: 20, height: 20, viewBox: "0 0 20 20", fill: "none", "aria-hidden": true } as const;

export function SelectIcon() {
  return (
    <svg {...S}>
      <path
        d="M4.5 3.2 16 8.4c.5.2.5.9 0 1.1l-4.6 1.6-1.9 4.5c-.2.5-.9.5-1.1 0L3.3 4.4c-.2-.7.5-1.4 1.2-1.2Z"
        fill="#fff"
        stroke="#3a3a3a"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PencilIcon() {
  return (
    <svg {...S}>
      <path d="m13.2 3.3 3.5 3.5-9.4 9.4-3.5-3.5 9.4-9.4Z" fill="#f6b73c" stroke="#8a5a14" strokeWidth="1.1" strokeLinejoin="round" />
      <path d="m13.2 3.3 1.4-1.4c.4-.4 1-.4 1.4 0l2.1 2.1c.4.4.4 1 0 1.4l-1.4 1.4-3.5-3.5Z" fill="#e5584f" stroke="#8a2e27" strokeWidth="1.1" strokeLinejoin="round" />
      <path d="m3.8 12.7 3.5 3.5-4.4 1.2c-.3.1-.6-.2-.5-.5l1.4-4.2Z" fill="#f3d7b0" stroke="#8a5a14" strokeWidth="1.1" strokeLinejoin="round" />
      <path d="m2.6 16.3.5 1.1 1.1-.3-1.1-1.1-.5.3Z" fill="#3a3a3a" />
    </svg>
  );
}

export function EraserIcon() {
  return (
    <svg {...S}>
      <path d="M11.4 3.2 17 8.8c.5.5.5 1.2 0 1.7l-5 5-7.3-7.3 5-5c.5-.5 1.2-.5 1.7 0Z" fill="#3d8fd6" stroke="#1f4f7a" strokeWidth="1.1" strokeLinejoin="round" />
      <path d="m4.7 8.2 7.3 7.3-1.5 1.5c-.5.5-1.2.5-1.7 0L3.2 11.4c-.5-.5-.5-1.2 0-1.7l1.5-1.5Z" fill="#f4f1ea" stroke="#1f4f7a" strokeWidth="1.1" strokeLinejoin="round" />
    </svg>
  );
}

export function ShapesIcon() {
  return (
    <svg {...S}>
      <circle cx="7.5" cy="7.5" r="4.8" fill="#fff" stroke="#3a3a3a" strokeWidth="1.3" />
      <rect x="8.5" y="8.5" width="8" height="8" rx="1.6" fill="#e9e6df" stroke="#3a3a3a" strokeWidth="1.3" />
    </svg>
  );
}

export function TextIcon() {
  return (
    <svg {...S}>
      <path d="M4.5 4.5h11M10 4.5v11.5M7.6 16h4.8" stroke="#3a3a3a" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4.5 4.5v1.6M15.5 4.5v1.6" stroke="#3a3a3a" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function FillIcon() {
  return (
    <svg {...S}>
      <path d="m8.4 3.4 6.4 6.4-5.3 5.3c-.5.5-1.2.5-1.7 0L3.1 10.4c-.5-.5-.5-1.2 0-1.7l5.3-5.3Z" fill="#fff" stroke="#3a3a3a" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M3.4 9.6h11" stroke="#3a3a3a" strokeWidth="1.2" />
      <path d="M3.4 9.6 8.4 14.6c.5.5 1.2.5 1.7 0l4.7-4.9-11.4-.1Z" fill="#9aa3ad" />
      <path d="M16.8 12.5s1.4 1.8 1.4 2.8a1.4 1.4 0 0 1-2.8 0c0-1 1.4-2.8 1.4-2.8Z" fill="#3a3a3a" />
    </svg>
  );
}

export function UndoIcon() {
  return (
    <svg {...S}>
      <path d="M7.5 4 3.5 8l4 4v-2.6c3.4 0 5.9.9 7.9 3.6-.6-3.9-2.9-6.6-7.9-6.9V4Z" fill="#6b6b6b" stroke="#6b6b6b" strokeWidth="1" strokeLinejoin="round" />
    </svg>
  );
}

export function RedoIcon() {
  return (
    <svg {...S}>
      <path d="m12.5 4 4 4-4 4v-2.6c-3.4 0-5.9.9-7.9 3.6.6-3.9 2.9-6.6 7.9-6.9V4Z" fill="#6b6b6b" stroke="#6b6b6b" strokeWidth="1" strokeLinejoin="round" />
    </svg>
  );
}

export function TrashIcon() {
  return (
    <svg {...S}>
      <path d="M4.5 6h11l-.9 10c-.1.8-.7 1.3-1.5 1.3H6.9c-.8 0-1.4-.5-1.5-1.3L4.5 6Z" fill="#d9d6cf" stroke="#5f5f5f" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M3.5 6h13M8 6V4.3c0-.5.4-.8.8-.8h2.4c.4 0 .8.3.8.8V6M8.4 9v5.5M11.6 9v5.5" stroke="#5f5f5f" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

/** Outline icon for each shape in the shapes menu. */
export function ShapeGlyph({ shape }: { shape: ShapeKind }) {
  const stroke = { stroke: "#4a4a4a", strokeWidth: 1.5, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
  return (
    <svg {...S}>
      {shape === "rect" && <rect x="2.5" y="5.5" width="15" height="9" rx="1.5" {...stroke} />}
      {shape === "square" && <rect x="4" y="4" width="12" height="12" rx="1.5" {...stroke} />}
      {shape === "circle" && <circle cx="10" cy="10" r="6.5" {...stroke} />}
      {shape === "hexagon" && <path d="M10 3.2 16 6.6v6.8L10 16.8 4 13.4V6.6L10 3.2Z" {...stroke} />}
      {shape === "star" && (
        <path d="m10 3 2.1 4.4 4.8.6-3.5 3.3.9 4.7L10 13.7 5.7 16l.9-4.7L3.1 8l4.8-.6L10 3Z" {...stroke} />
      )}
      {shape === "arrow" && <path d="M3.5 10h13M12 5.5l4.5 4.5-4.5 4.5" {...stroke} />}
      {shape === "rounded" && <rect x="3" y="5" width="14" height="10" rx="4.5" {...stroke} />}
    </svg>
  );
}
