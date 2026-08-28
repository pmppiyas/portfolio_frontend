'use client';

import React, { useRef, useEffect, useCallback } from 'react';

interface Point {
  x: number;
  y: number;
}

interface StringArtProps {
  children?: React.ReactNode;
  className?: string;
}

const StringArt: React.FC<StringArtProps> = ({ children, className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mousePositionRef = useRef<Point>({ x: 0, y: 0 });
  const dimensionsRef = useRef<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  const anchorPointsRef = useRef<Point[]>([]);
  const animationRef = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);

  // Generate Points based on container size
  const generateAnchorPoints = useCallback((width: number, height: number) => {
    const points: Point[] = [];
    const pointCount = width < 768 ? 30 : 60;
    const radius = Math.min(width, height) * 0.4;
    const centerX = width / 2;
    const centerY = height / 2;

    for (let i = 0; i < pointCount; i++) {
      const angle = (i / pointCount) * Math.PI * 2;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      points.push({ x, y });
    }
    anchorPointsRef.current = points;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const updateDimensions = () => {
      if (!containerRef.current || !canvasRef.current) return;

      const { offsetWidth, offsetHeight } = containerRef.current;
      if (offsetWidth === 0 || offsetHeight === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = offsetWidth * dpr;
      canvas.height = offsetHeight * dpr;
      canvas.style.width = `${offsetWidth}px`;
      canvas.style.height = `${offsetHeight}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      dimensionsRef.current = { width: offsetWidth, height: offsetHeight };
      mousePositionRef.current = {
        x: offsetWidth / 2,
        y: offsetHeight / 2,
      };
      generateAnchorPoints(offsetWidth, offsetHeight);
    };

    updateDimensions();

    let resizeTimer: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateDimensions, 100);
    };
    window.addEventListener('resize', debouncedResize);

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mousePositionRef.current.x = e.clientX - rect.left;
      mousePositionRef.current.y = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Pause when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting && !animationRef.current) {
          animationRef.current = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

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

      ctx.clearRect(0, 0, width, height);
      const anchorPoints = anchorPointsRef.current;
      const mouse = mousePositionRef.current;

      // Draw Anchor Dots
      ctx.fillStyle = 'rgba(0, 255, 255, 0.3)';
      for (let i = 0; i < anchorPoints.length; i++) {
        const point = anchorPoints[i];
        ctx.beginPath();
        ctx.arc(point.x, point.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw Strings
      const maxDistance = Math.max(width, height) * 0.8 || 1;
      for (let i = 0; i < anchorPoints.length; i++) {
        const point = anchorPoints[i];
        const dx = point.x - mouse.x;
        const dy = point.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);

        // Selective drawing for "string" look
        const skipFactor = Math.abs(Math.sin(angle * 5)) < 0.2;
        if (skipFactor) continue;

        const opacity = 0.05 + 0.3 * (1 - Math.min(1, distance / maxDistance));
        const hue = ((angle * 180) / Math.PI + 180) % 360;

        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `hsla(${hue}, 70%, 50%, ${opacity})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Mouse Glow
      const grad = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        0,
        mouse.x,
        mouse.y,
        50
      );
      grad.addColorStop(0, 'rgba(0, 255, 255, 0.1)');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 50, 0, Math.PI * 2);
      ctx.fill();

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', debouncedResize);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [generateAnchorPoints]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#050505] ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
};

export default StringArt;
