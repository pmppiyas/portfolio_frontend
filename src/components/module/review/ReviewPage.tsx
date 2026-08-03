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
    <div id="review" className="w-full px-4 md:px-8 ">
      <div className="max-w-7xl mx-auto mt-4" ref={ref as any}>
        <CustomHeading heading="They Say" />

        <div
          className={`overflow-hidden cursor-grab active:cursor-grabbing mt-8 select-none fade-in-up ${inView ? 'visible' : ''}`}
          ref={emblaRef}
        >
          <div className="flex -ml-4">
            {myReviews.map((review, index) => (
              <ReviewCard key={index} review={review} index={index} />
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {myReviews.map((_, index) => (
            <button
              key={index}
              className={cn(
                'h-2 w-2 rounded-full transition-all duration-300',
                index === selectedIndex
                  ? 'bg-primary w-6'
                  : 'bg-muted-foreground/30'
              )}
              onClick={() => emblaApi?.scrollTo(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
