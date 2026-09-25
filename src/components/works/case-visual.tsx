import Image from "next/image";
import type { Visual } from "@/lib/case-studies";

/** A capture in a minimal browser window, or a mockup image shown as-is. */
export function CaseVisual({
  visual,
  sizes,
  priority = false,
  className = "",
}: {
  visual: Visual;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const image = (
    <Image
      src={visual.src}
      alt={visual.alt}
      width={visual.width}
      height={visual.height}
      sizes={sizes}
      priority={priority}
      className="h-auto w-full"
    />
  );

  if (visual.frame === "browser") {
    return (
      <div
        className={`overflow-hidden rounded-xl border border-black/10 bg-white shadow-[0_24px_60px_-20px_rgba(0,0,0,0.35)] ${className}`}
      >
        <div className="flex items-center gap-1.5 border-b border-black/5 bg-[#f6f4ef] px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        {image}
      </div>
    );
  }

  return <div className={`overflow-hidden rounded-xl ${className}`}>{image}</div>;
}
