import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaCarouselType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@lib/utils';
import { SectionHeading } from '@components/shared/SectionHeading';
import { TestimonialCard } from './TestimonialCard';
import { testimonials as defaultTestimonials } from '@data/testimonials';
import type { Testimonial } from '@data/types';

interface TestimonialsProps {
  items?: Testimonial[];
  className?: string;
}

function Testimonials({ items, className }: TestimonialsProps) {
  const testimonialData = items ?? defaultTestimonials;

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      slidesToScroll: 1,
    },
    [Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setSelectedIndex(api.selectedScrollSnap());
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  const onInit = useCallback((api: EmblaCarouselType) => {
    setScrollSnaps(api.scrollSnapList());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);

    emblaApi.on('reInit', onInit);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);

    return () => {
      emblaApi.off('reInit', onInit);
      emblaApi.off('reInit', onSelect);
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onInit, onSelect]);

  return (
    <section className={cn('animate-section bg-neutral-50 py-16 sm:py-24', className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          overline="Testimonials"
          title="Trusted by engineering teams"
          subtitle="Hear from developers who replaced polling scripts with real-time event streams."
        />

        <div className="relative">
          {/* Carousel viewport */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="-ml-4 flex">
              {testimonialData.map((testimonial, index) => (
                <div
                  key={index}
                  className="min-w-0 shrink-0 grow-0 basis-full pl-4 sm:basis-1/2"
                >
                  <TestimonialCard
                    quote={testimonial.quote}
                    name={testimonial.name}
                    role={testimonial.role}
                    company={testimonial.company}
                    rating={testimonial.rating}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            aria-label="Previous testimonial"
            className={cn(
              'absolute -left-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-neutral-200 bg-white p-2 shadow-sm transition-opacity hover:bg-neutral-50 sm:block',
              !canScrollPrev && 'opacity-40 cursor-default'
            )}
          >
            <ChevronLeft className="h-5 w-5 text-neutral-600" />
          </button>

          <button
            type="button"
            onClick={scrollNext}
            disabled={!canScrollNext}
            aria-label="Next testimonial"
            className={cn(
              'absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-neutral-200 bg-white p-2 shadow-sm transition-opacity hover:bg-neutral-50 sm:block',
              !canScrollNext && 'opacity-40 cursor-default'
            )}
          >
            <ChevronRight className="h-5 w-5 text-neutral-600" />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="mt-6 flex justify-center gap-2" role="tablist" aria-label="Testimonial slides">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={index === selectedIndex}
              aria-label={`Go to testimonial ${index + 1}`}
              onClick={() => scrollTo(index)}
              className={cn(
                'h-2 rounded-full transition-all duration-200',
                index === selectedIndex
                  ? 'w-6 bg-brand-600'
                  : 'w-2 bg-neutral-300 hover:bg-neutral-400'
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export { Testimonials };
export type { TestimonialsProps };
