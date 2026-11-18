import { COMPANY_CONFIG } from '../config/company';

interface BrandLogoProps {
  size?: 'sm' | 'md';
}

export function BrandLogo({ size = 'md' }: BrandLogoProps) {
  if (COMPANY_CONFIG.logoUrl) {
    return (
      <img
        src={COMPANY_CONFIG.logoUrl}
        alt={COMPANY_CONFIG.name}
        referrerPolicy="no-referrer"
        className={size === 'sm' ? 'h-8 w-auto object-contain' : 'h-9 w-auto object-contain'}
      />
    );
  }

  return (
    <span className="inline-flex items-center gap-3 whitespace-nowrap shrink-0">
      {/* Monograma "OS" modernizado inspirado na fachada original da Oficina Do Som */}
      <svg
        width={size === 'sm' ? 42 : 48}
        height={size === 'sm' ? 24 : 28}
        viewBox="0 0 64 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        {/* O geométrico largo */}
        <rect
          x="2"
          y="4"
          width="26"
          height="24"
          rx="2"
          stroke="#FFFFFF"
          strokeWidth="3.2"
        />
        {/* S geométrico em traço contínuo */}
        <path
          d="M61 5.5H36.5V16H60.5V26.5H35"
          stroke="#8B35FF"
          strokeWidth="3.2"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      </svg>
      <span
        className={`font-display font-bold tracking-tight text-white uppercase ${
          size === 'sm' ? 'text-xl' : 'text-2xl'
        }`}
      >
        Oficina <span className="text-[#8B35FF]">Do Som</span>
      </span>
    </span>
  );
}
