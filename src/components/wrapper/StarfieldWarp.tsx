'use client';

import { useRef, useEffect, ReactNode } from 'react';

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  color: string;
}

interface StarfieldWarpProps {
  children?: ReactNode;
  starCount?: number;
  className?: string;
}

const StarfieldWarp: React.FC<StarfieldWarpProps> = ({
  children,
  starCount,
  className = '',
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const dimensionsRef = useRef<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  const starsRef = useRef<Star[]>([]);
  const warpSpeedRef = useRef<number>(0);
  const animationRef = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const initStars = (width: number, height: number) => {
      const count = starCount || (width < 768 ? 200 : 350);
      const stars: Star[] = [];

      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * width - width / 2,
          y: Math.random() * height - height / 2,
          z: Math.random() * 1000,
          size: Math.random() * 2 + 1,
          color: `hsl(${Math.random() * 60 + 200}, 100%, ${Math.random() * 30 + 70}%)`,
        });
      }

      starsRef.current = stars;
      warpSpeedRef.current = 0;
    };

    const handleResize = () => {
      if (!wrapperRef.current) return;

      const rect = wrapperRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      if (width === 0 || height === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      dimensionsRef.current = { width, height };
      mousePositionRef.current = { x: width / 2, y: height / 2 };
      initStars(width, height);
    };

    handleResize();

    let resizeTimer: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleResize, 100);
    };
    window.addEventListener('resize', debouncedResize);

    const handleMouseMove = (e: MouseEvent) => {
      if (!wrapperRef.current) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      mousePositionRef.current.x = e.clientX - rect.left;
      mousePositionRef.current.y = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting && !animationRef.current) {
          animationRef.current = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(wrapper);

    const animate = () => {
      if (!isVisibleRef.current) {
        animationRef.current = null;
        return;
      }

      const { width, height } = dimensionsRef.current;
      if (width === 0 || height === 0) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.fillStyle = 'rgba(10, 10, 20, 0.25)';
      ctx.fillRect(0, 0, width, height);

      const stars = starsRef.current;
      const centerX = width / 2;
      const centerY = height / 2;

      const dx = mousePositionRef.current.x - centerX;
      const dy = mousePositionRef.current.y - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY) || 1;

      const targetWarpSpeed = Math.min(1, distance / maxDistance) * 12;
      warpSpeedRef.current += (targetWarpSpeed - warpSpeedRef.current) * 0.05;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.z -= warpSpeedRef.current + 0.5;

        if (star.z <= 0 || star.z > 1000) {
          star.x = Math.random() * width - centerX;
          star.y = Math.random() * height - centerY;
          star.z = 1000;
          star.size = Math.random() * 2 + 1;
        }

        const projectedX = (star.x / star.z) * 500 + centerX;
        const projectedY = (star.y / star.z) * 500 + centerY;
        const projectedSize = star.size * (1 - star.z / 1000);

        if (
          projectedX < -10 ||
          projectedX > width + 10 ||
          projectedY < -10 ||
          projectedY > height + 10
        )
          continue;

        if (warpSpeedRef.current > 4 && star.z < 500) {
          const prevX =
            (star.x / (star.z + warpSpeedRef.current * 2)) * 500 + centerX;
          const prevY =
            (star.y / (star.z + warpSpeedRef.current * 2)) * 500 + centerY;

          ctx.beginPath();
          ctx.moveTo(projectedX, projectedY);
          ctx.lineTo(prevX, prevY);
          ctx.strokeStyle = star.color;
          ctx.lineWidth = projectedSize;
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(projectedX, projectedY, projectedSize, 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.fill();
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', debouncedResize);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [starCount]);

  return (
    <div
      ref={wrapperRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      />
      <div className="relative" style={{ zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
};

export default StarfieldWarp;
