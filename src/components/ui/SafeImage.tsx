'use client';

import { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';

const DEFAULT_FALLBACK = 'https://i.ibb.co.com/fV500sDk/download-2.jpg';

interface SafeImageProps extends Omit<ImageProps, 'src'> {
  src?: string | null;
  fallbackSrc?: string;
}

export default function SafeImage({
  src,
  fallbackSrc = DEFAULT_FALLBACK,
  alt = 'Image',
  ...rest
}: SafeImageProps) {
  const initialSrc = src && typeof src === 'string' && src.trim() ? src.trim() : fallbackSrc;
  const [imgSrc, setImgSrc] = useState<string>(initialSrc);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const valid = src && typeof src === 'string' && src.trim() ? src.trim() : fallbackSrc;
    setImgSrc(valid);
    setHasError(false);
  }, [src, fallbackSrc]);

  return (
    <Image
      {...rest}
      src={hasError ? fallbackSrc : imgSrc}
      alt={alt}
      unoptimized={true}
      onError={() => {
        if (!hasError) {
          setHasError(true);
          setImgSrc(fallbackSrc);
        }
      }}
    />
  );
}
