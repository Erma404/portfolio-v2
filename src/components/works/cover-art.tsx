import Image from "next/image";
import type { Visual } from "@/lib/case-studies";

const HOVER_EASE = "transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]";

/**
 * A project cover inside a positioned parent: photos fill it, site captures sit
 * in a window frame at their own ratio, other mockups are contained.
 * Shared by the /works cards and the home page "Selected works" block.
 */
export function CoverArt({
  cover,
  sizes,
  captionSpace = true,
}: {
  cover: Visual;
  sizes: string;
  /** Leave room at the bottom for an overlapping caption bar. */
  captionSpace?: boolean;
}) {
  const isCapture = cover.frame === "browser";
  const isPhoto = cover.frame === "photo";

  return (
    <>
      {isPhoto ? (
        // Mockup photos fill the whole card.
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          sizes={sizes}
          className={`object-cover ${HOVER_EASE} group-hover:scale-[1.03]`}
        />
      ) : (
        <div
          className={`absolute flex justify-center ${captionSpace ? "inset-x-[12%] top-[14%] bottom-[18%] items-start" : "inset-[10%] items-center"} ${HOVER_EASE} group-hover:-translate-y-2 group-hover:scale-[1.02]`}
        >
          {/* Captures keep their own ratio so nothing is cropped sideways. */}
          <div
            className={`relative w-full overflow-hidden ${
              isCapture
                ? "rounded-xl border border-black/10 bg-white shadow-[0_24px_60px_-20px_rgba(0,0,0,0.4)]"
                : "h-full rounded-xl"
            }`}
            style={isCapture ? { aspectRatio: `${cover.width} / ${cover.height}` } : undefined}
          >
            <Image
              src={cover.src}
              alt={cover.alt}
              fill
              sizes={sizes}
              className={isCapture ? "object-cover object-top" : "object-contain"}
            />
          </div>
        </div>
      )}
    </>
  );
}
