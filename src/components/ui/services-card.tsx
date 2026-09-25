"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";

// --- Carousel Context ---
type CarouselApi = EmblaCarouselType | undefined;
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];
type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};
type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}

// --- Main Carousel Component ---
const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    );
    // Read scroll availability straight from Embla, re-rendering on its events.
    const subscribe = React.useCallback(
      (onChange: () => void) => {
        if (!api) return () => {};
        api.on("select", onChange);
        api.on("reInit", onChange);
        return () => {
          api.off("select", onChange);
          api.off("reInit", onChange);
        };
      },
      [api]
    );
    const canScrollPrev = React.useSyncExternalStore(
      subscribe,
      () => api?.canScrollPrev() ?? false,
      () => false
    );
    const canScrollNext = React.useSyncExternalStore(
      subscribe,
      () => api?.canScrollNext() ?? false,
      () => false
    );

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    const scrollNext = React.useCallback(() => {
      api?.scrollNext();
    }, [api]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext]
    );

    React.useEffect(() => {
      if (!api || !setApi) return;
      setApi(api);
    }, [api, setApi]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation,
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = "Carousel";

// --- Carousel Content ---
const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();
  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

// --- Carousel Item ---
const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();
  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  );
});
CarouselItem.displayName = "CarouselItem";

// --- Carousel Controls ---
const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button> & { label?: string }
>(({ className, variant = "outline", size = "icon", label = "Next slide", ...props }, ref) => {
  const { scrollNext, canScrollNext } = useCarousel();
  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-10 w-10 rounded-full",
        "right-2 top-1/2 -translate-y-1/2",
        className
      )}
      onClick={scrollNext}
      disabled={!canScrollNext}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">{label}</span>
    </Button>
  );
});
CarouselNext.displayName = "CarouselNext";

// --- Service Card & Carousel Section ---
export interface Service {
  number: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

// Sub-component for individual cards
const ServiceCard = ({
  service,
  index,
}: {
  service: Service;
  index: number;
}) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      className="relative flex h-[450px] w-full flex-col justify-between overflow-hidden rounded-3xl bg-[#161616] p-8 text-white"
    >
      {/* Card Content */}
      <div className="z-10 flex flex-col items-start text-left">
        <span className="mb-8 font-mono text-sm text-white/40">
          ( {service.number} )
        </span>
        <div className="relative mb-auto flex h-12 w-12 items-center justify-center text-[#f5824f]">
          <span className="absolute left-0 top-0 h-2.5 w-2.5 border-l border-t border-[#f5824f]/50" />
          <span className="absolute right-0 top-0 h-2.5 w-2.5 border-r border-t border-[#f5824f]/50" />
          <span className="absolute bottom-0 left-0 h-2.5 w-2.5 border-b border-l border-[#f5824f]/50" />
          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 border-b border-r border-[#f5824f]/50" />
          <service.icon className="h-7 w-7" />
        </div>
      </div>
      <div className="z-10">
        <h3 className="mb-2 font-serif text-2xl tracking-tight">
          {service.title}
        </h3>
        <p className="text-sm leading-relaxed text-white/60">
          {service.description}
        </p>
      </div>
    </motion.div>
  );
};

// Main exportable component
export const ServiceCarousel = ({
  services,
  nextLabel,
}: {
  services: Service[];
  nextLabel?: string;
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [autoplay] = React.useState(() =>
    Autoplay({ delay: 2600, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  return (
    <div className="mx-auto w-full max-w-6xl px-4">
      <Carousel
        ref={ref}
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[autoplay]}
        className="relative"
      >
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ staggerChildren: 0.1 }}
        >
          <CarouselContent>
            {services.map((service, index) => (
              <CarouselItem
                key={index}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1">
                  <ServiceCard service={service} index={index} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </motion.div>
        <CarouselNext label={nextLabel} className="border-0 bg-foreground/10 text-foreground hover:bg-foreground/20" />
      </Carousel>
    </div>
  );
};
