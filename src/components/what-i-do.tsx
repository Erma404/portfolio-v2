"use client";

import { Hammer, Target, Search, RefreshCw, Users, Briefcase } from "lucide-react";
import { useDictionary } from "@/i18n/provider";
import { SectionHeading } from "@/components/section-heading";
import { SpatialSlider, type SpatialItem } from "@/components/spatial-slider";

const ICONS: Record<string, React.ElementType> = {
  build: Hammer,
  target: Target,
  search: Search,
  loop: RefreshCw,
  people: Users,
  briefcase: Briefcase,
};

export function WhatIDo() {
  const { whatIDo } = useDictionary();
  const services: SpatialItem[] = whatIDo.services.map((service, i) => ({
    number: String(i + 1).padStart(2, "0"),
    title: service.title,
    description: service.description,
    icon: ICONS[service.icon],
  }));

  return (
    <section className="bg-[#fafafa] pb-8 pt-24 sm:pb-10 sm:pt-32">
      <SectionHeading
        eyebrow={whatIDo.eyebrow}
        title={whatIDo.title}
        align="center"
        serif
      />

      <div className="mt-16">
        <SpatialSlider
          items={services}
          labels={{
            prev: whatIDo.prev,
            next: whatIDo.next,
            goTo: whatIDo.goTo,
            region: whatIDo.region,
          }}
        />
      </div>
    </section>
  );
}
