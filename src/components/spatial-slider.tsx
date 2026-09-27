"use client";

import { useCallback, useEffect, useRef, useState, type ElementType } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  useVelocity,
  type MotionValue,
} from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

export type SpatialItem = {
  number: string;
  title: string;
  description: string;
  icon: ElementType;
};

const GAP = 24;
const MAX_TILT = 30; // degrees at the edges of the row
const VELOCITY_TILT = 0.012; // extra tilt per px/s while the row moves

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

/**
 * One card of the ring. Its tilt depends on how far it sits from the centre
 * (like the inside of a cylinder) plus the current speed of the row, which
 * gives the "spatial" swing while sliding.
 */
function SpatialCard({
  item,
  slot,
  step,
  x,
  velocity,
  reduce,
}: {
  item: SpatialItem;
  slot: number;
  step: number;
  x: MotionValue<number>;
  velocity: MotionValue<number>;
  reduce: boolean;
}) {
  // Distance from the centre, in cards (0 = centred).
  const offset = useTransform(x, (v) => (slot * step + v) / step);
  const translateX = useTransform(x, (v) => slot * step + v);
  const rotateY = useTransform([offset, velocity], ([o, vel]: number[]) => {
    if (reduce) return 0;
    const base = Math.max(-MAX_TILT, Math.min(MAX_TILT, -o * 11));
    const swing = Math.max(-25, Math.min(25, -vel * VELOCITY_TILT));
    return base + swing;
  });
  const z = useTransform(offset, (o) => (reduce ? 0 : -Math.abs(o) * 30));
  const Icon = item.icon;

  return (
    <motion.article
      className="absolute left-1/2 top-0 flex h-full flex-col justify-between rounded-3xl bg-[#161616] p-7 text-white shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] sm:p-8"
      style={{
        width: step - GAP,
        marginLeft: -(step - GAP) / 2,
        x: translateX,
        z,
        rotateY,
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
      }}
    >
      <div className="flex flex-col items-start">
        <span className="mb-8 font-mono text-sm text-white/40">( {item.number} )</span>
        <div className="relative flex h-12 w-12 items-center justify-center text-[#f5824f]">
          <span className="absolute left-0 top-0 h-2.5 w-2.5 border-l border-t border-[#f5824f]/50" />
          <span className="absolute right-0 top-0 h-2.5 w-2.5 border-r border-t border-[#f5824f]/50" />
          <span className="absolute bottom-0 left-0 h-2.5 w-2.5 border-b border-l border-[#f5824f]/50" />
          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 border-b border-r border-[#f5824f]/50" />
          <Icon className="h-7 w-7" aria-hidden />
        </div>
      </div>
      <div>
        <h3 className="mb-2 font-serif text-2xl tracking-tight">{item.title}</h3>
        <p className="text-sm leading-relaxed text-white/60">{item.description}</p>
      </div>
    </motion.article>
  );
}

/**
 * Infinite "spatial" card slider (after Osmo's spatial cards slider): the row
 * loops forever, cards tilt in 3D with their distance from the centre, and it
 * is driven by Prev/Next, the dots, dragging or the arrow keys.
 */
export function SpatialSlider({
  items,
  labels,
}: {
  items: SpatialItem[];
  labels: { prev: string; next: string; goTo: string; region: string };
}) {
  const reduce = useReducedMotion() ?? false;
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(1200);
  const [index, setIndex] = useState(0); // unbounded: the row never ends
  const x = useMotionValue(0);
  const velocity = useVelocity(x);

  const cardWidth = Math.round(Math.min(360, Math.max(260, width * 0.27)));
  const step = cardWidth + GAP;
  const count = items.length;
  const active = mod(index, count);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Slide the row to the current index (and snap back after a resize).
  useEffect(() => {
    const controls = animate(x, -index * step, reduce
      ? { duration: 0 }
      : { type: "spring", stiffness: 140, damping: 22, mass: 0.9 });
    return () => controls.stop();
  }, [index, step, x, reduce]);

  const go = useCallback((delta: number) => setIndex((i) => i + delta), []);
  const goTo = (target: number) => setIndex((i) => i + (target - mod(i, count)));

  // Render enough cards to overflow both edges of the container.
  const reach = Math.ceil(width / step / 2) + 2;
  const slots = [];
  for (let s = index - reach; s <= index + reach; s++) slots.push(s);

  const dragStart = useRef(0);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={labels.region}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(-1);
        if (e.key === "ArrowRight") go(1);
      }}
      className="outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
    >
      <motion.div
        ref={containerRef}
        className="relative h-[470px] cursor-grab touch-pan-y select-none overflow-x-clip active:cursor-grabbing sm:h-[500px]"
        style={{ perspective: 1400 }}
        onPanStart={() => {
          dragStart.current = x.get();
        }}
        onPan={(_, info) => x.set(dragStart.current + info.offset.x)}
        onPanEnd={(_, info) => {
          const moved = -(info.offset.x + info.velocity.x * 0.2) / step;
          const delta = Math.round(moved);
          if (delta === 0) {
            // Too short a drag: settle back on the current card.
            animate(x, -index * step, { type: "spring", stiffness: 140, damping: 22 });
          } else {
            go(delta);
          }
        }}
      >
        <div className="absolute inset-x-0 bottom-12 top-6" style={{ transformStyle: "preserve-3d" }}>
          {slots.map((slot) => (
            <SpatialCard
              key={slot}
              slot={slot}
              item={items[mod(slot, count)]}
              step={step}
              x={x}
              velocity={velocity}
              reduce={reduce}
            />
          ))}
        </div>
      </motion.div>

      <div className="-mt-4 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label={labels.prev}
          className="grid h-11 w-11 place-items-center rounded-full bg-[#141414] text-white transition-transform hover:-translate-x-0.5 active:scale-95"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
        </button>
        <div className="flex items-center gap-2">
          {items.map((item, i) => (
            <button
              key={item.title}
              type="button"
              aria-label={`${labels.goTo} ${i + 1}: ${item.title}`}
              aria-current={i === active ? "true" : undefined}
              onClick={() => goTo(i)}
              className="grid h-6 w-4 place-items-center"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? "w-4 bg-[#141414]" : "w-1.5 bg-[#141414]/25"
                }`}
              />
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label={labels.next}
          className="grid h-11 w-11 place-items-center rounded-full bg-[#efe3d3] text-[#141414] transition-transform hover:translate-x-0.5 active:scale-95"
        >
          <ArrowRight className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}
