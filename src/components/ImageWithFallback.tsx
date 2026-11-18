import { useState } from 'react';
import { Wrench } from 'lucide-react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
  loading?: 'eager' | 'lazy';
}

export function ImageWithFallback({
  src,
  alt,
  className = '',
  fallbackLabel,
  loading = 'lazy',
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#17171F] via-[#12121A] to-[#09090D] border border-white/10 text-[#A5A5B0] p-6 text-center ${className}`}
      >
        <Wrench className="w-7 h-7 text-[#8B35FF]" aria-hidden="true" />
        <span className="text-xs font-medium tracking-wide text-white/80">
          {fallbackLabel || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
