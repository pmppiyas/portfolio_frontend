'use client';

import { IReview } from '@/types';
import { Star, ShieldCheck, Terminal } from 'lucide-react';
import Image from 'next/image';

const ReviewCard = ({ index, review }: { index: number; review: IReview }) => {
  return (
    <div
      key={index}
      className="flex-[0_0_100%] min-w-0 pl-4 md:flex-[0_0_50%] lg:flex-[0_0_33.33%] py-2"
    >
      <div className="h-full bg-gray-950/80 rounded-xl border border-cyan-500/20 hover:border-cyan-400/60 p-5 shadow-lg hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
        {/* Cyber Corner Markers */}
        <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-transparent group-hover:border-cyan-400 transition-colors duration-200" />
        <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-transparent group-hover:border-cyan-400 transition-colors duration-200" />
        <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-transparent group-hover:border-cyan-400 transition-colors duration-200" />
        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-transparent group-hover:border-cyan-400 transition-colors duration-200" />

        <div>
          {/* Top Telemetry Header */}
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10 font-mono text-[9px]">
            <span className="text-cyan-400/80 group-hover:text-cyan-300 font-bold">
              {`// TRANSMISSION_0${index + 1}`}
            </span>
            <div className="flex items-center gap-1 text-green-400 uppercase font-semibold">
              <span className="w-1 h-1 rounded-full bg-green-400 animate-pulse" />
              <span>VERIFIED</span>
            </div>
          </div>

          {/* Cyber Star Rating */}
          <div className="flex items-center gap-1 mb-2.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className="fill-cyan-400 text-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.6)]"
              />
            ))}
            <span className="ml-1.5 text-[9.5px] font-mono text-cyan-300/80 font-bold">
              [ 5.0_INDEX ]
            </span>
          </div>

          {/* Review Heading */}
          <h4
            className="font-bold text-sm sm:text-base mb-2 tracking-tight leading-snug text-white group-hover:text-cyan-300 transition-colors duration-200"
            style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}
          >
            {review.heading}
          </h4>

          {/* Description */}
          <p className="text-gray-300 font-mono text-xs leading-relaxed">
            &quot;{review.description}&quot;
          </p>
        </div>

        {/* Client Footer */}
        <div className="flex items-center justify-between mt-5 pt-3 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="relative h-9 w-9 rounded-lg overflow-hidden bg-gray-900 border border-cyan-500/30 group-hover:border-cyan-400 transition-colors shrink-0">
              <Image
                src={review.image}
                alt={review.name}
                fill
                sizes="36px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-mono font-bold text-xs leading-none text-white truncate">
                {review.name}
              </span>
              <span className="font-mono text-[9.5px] text-gray-500 truncate mt-1">
                {review.title}
              </span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-1 text-[8.5px] font-mono text-cyan-500/70 bg-cyan-500/10 px-1.5 py-0.5 rounded">
            <ShieldCheck size={10} className="text-cyan-400" />
            <span>AUTHENTIC</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
