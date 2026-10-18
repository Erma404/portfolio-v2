"use client";

import { useSyncExternalStore } from "react";
import { formatPriceEndDate, isLaunchPriceActive, promptPackConfig } from "@/lib/prompt-pack-config";

const subscribe = () => () => {};

/**
 * The site is static, so the launch price could outlive its end date until the next
 * build. The browser re-checks the date on load; the server render uses the build date.
 */
export function PriceLine({ buildTimeActive }: { buildTimeActive: boolean }) {
  const active = useSyncExternalStore(subscribe, () => isLaunchPriceActive(), () => buildTimeActive);
  const { launchPrice, regularPrice, launchPriceEndDate } = promptPackConfig;

  return (
    <p className="font-serif text-3xl tracking-tight text-foreground sm:text-4xl">
      {active
        ? `Launch price: $${launchPrice} until ${formatPriceEndDate(launchPriceEndDate)}. Then $${regularPrice}.`
        : `$${regularPrice}`}
    </p>
  );
}
