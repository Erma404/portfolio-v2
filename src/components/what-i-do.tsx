"use client";

import {
  Target,
  Search,
  FlaskConical,
  RefreshCw,
  Users,
  Lightbulb,
  ListChecks,
  Briefcase,
} from "lucide-react";
import { useDictionary } from "@/i18n/provider";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCarousel, type Service } from "@/components/ui/services-card";

const ICONS: Record<string, React.ElementType> = {
  target: Target,
  search: Search,
  flask: FlaskConical,
  loop: RefreshCw,
  people: Users,
  bulb: Lightbulb,
  list: ListChecks,
  briefcase: Briefcase,
};

export function WhatIDo() {
  const { whatIDo } = useDictionary();
  const services: Service[] = whatIDo.services.map((service, i) => ({
    number: String(i + 1).padStart(2, "0"),
    title: service.title,
    description: service.description,
    icon: ICONS[service.icon],
  }));

  return (
    <section className="bg-[#fafafa] py-24 sm:py-32">
      <SectionHeading
        eyebrow={whatIDo.eyebrow}
        title={whatIDo.title}
        align="center"
        serif
      />

      <div className="mt-16">
        <ServiceCarousel services={services} nextLabel={whatIDo.nextSlide} />
      </div>
    </section>
  );
}
