import { useEffect, useRef, useState, type ReactNode } from 'react';

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return false;
    }
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => setReduced(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return reduced;
}

export function ScrollProgressBar() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let rafId = 0;
    const updateProgress = () => {
      rafId = 0;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setProgress(0);
        return;
      }
      const ratio = Math.min(1, Math.max(0, window.scrollY / docHeight));
      setProgress(ratio);
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 inset-x-0 h-[2px] z-50 pointer-events-none bg-transparent"
    >
      <div
        className="h-full bg-[#8B35FF] origin-left transition-transform duration-75 ease-out"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}

interface RevealSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: 'up' | 'left' | 'right' | 'scale';
}

export function RevealSection({
  children,
  className = '',
  delay = 0,
  variant = 'up',
}: RevealSectionProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const hiddenTransform =
    variant === 'scale'
      ? 'opacity-0 scale-[0.97]'
      : 'opacity-0 translate-y-7';

  const visibleTransform =
    variant === 'scale'
      ? 'opacity-100 scale-100'
      : 'opacity-100 translate-x-0 translate-y-0';

  return (
    <div
      ref={containerRef}
      style={{
        transitionDelay: `${Math.round(delay * 1000)}ms`,
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
      }}
      className={`transition-[opacity,transform] duration-[900ms] will-change-transform ${
        isVisible ? visibleTransform : hiddenTransform
      } ${className}`}
    >
      {children}
    </div>
  );
}
