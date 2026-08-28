'use client';

import * as React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import assets from '@/assets/assets';
import { cn, fadeInUp } from '@/lib/utils';
import ReviewCard from '@/components/module/review/ReviewCard';
import { IReview } from '@/types';
import { useInView } from '@/hooks/useInView';
import CustomHeading from '@/components/module/shared/Heading';

const { myReviews }: { myReviews: IReview[] } = assets;

export default function ReviewPage() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: true,
    skipSnaps: false,
    dragFree: true,
  });

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section
      id="review"
      className="w-full py-12 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto space-y-8" ref={ref as any}>
        <CustomHeading
          heading="They Say"
          badge="SYS.FEEDBACK // VERIFIED_TRANSMISSIONS"
          subtitle="Client Testimonials, Performance Audits & Trust Metrics"
        />

        <div
          className={`overflow-hidden cursor-grab active:cursor-grabbing select-none fade-in-up ${
            inView ? 'visible' : ''
          }`}
          ref={emblaRef}
        >
          <div className="flex -ml-4">
            {myReviews.map((review, index) => (
              <ReviewCard key={index} review={review} index={index} />
            ))}
          </div>
        </div>

        {/* Cyber Pagination & Controls */}
        <div className="flex items-center justify-center gap-4 pt-2 font-mono">
          <button
            onClick={() => emblaApi?.scrollPrev()}
            className="px-2.5 py-1 rounded bg-white/5 hover:bg-cyan-500/20 text-cyan-400 border border-white/10 hover:border-cyan-400 text-xs font-bold transition-all duration-200"
            title="Previous"
          >
            [ &lt; ]
          </button>

          <div className="flex items-center gap-1.5">
            {myReviews.map((_, index) => (
              <button
                key={index}
                className={cn(
                  'h-1.5 rounded-full transition-all duration-300',
                  index === selectedIndex
                    ? 'bg-cyan-400 w-5 shadow-[0_0_8px_rgba(34,211,238,0.8)]'
                    : 'bg-white/20 hover:bg-white/40 w-1.5'
                )}
                onClick={() => emblaApi?.scrollTo(index)}
              />
            ))}
          </div>

          <button
            onClick={() => emblaApi?.scrollNext()}
            className="px-2.5 py-1 rounded bg-white/5 hover:bg-cyan-500/20 text-cyan-400 border border-white/10 hover:border-cyan-400 text-xs font-bold transition-all duration-200"
            title="Next"
          >
            [ &gt; ]
          </button>
        </div>
      </div>
    </section>
  );
}
