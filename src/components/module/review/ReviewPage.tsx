'use client';

import * as React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import assets from '@/assets/assets';
import { CustomHeading } from '@/components/module/shared/Heading';
import { cn, fadeInUp } from '@/lib/utils';
import ReviewCard from '@/components/module/review/ReviewCard';
import { IReview } from '@/types';
import { motion } from 'framer-motion';

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

  return (
    <div id="review" className="w-full px-4 md:px-8 ">
      <div className="max-w-7xl mx-auto mt-4">
        <CustomHeading heading="They Say" />

        <motion.div
          {...fadeInUp}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className=" overflow-hidden cursor-grab active:cursor-grabbing mt-8 select-none"
          ref={emblaRef}
        >
          <div className="flex -ml-4">
            {myReviews.map((review, index) => (
              <ReviewCard key={index} review={review} index={index} />
            ))}
          </div>
        </motion.div>

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
