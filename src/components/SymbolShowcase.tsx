export function SymbolShowcase() {
  return (
    <div className="animate-hero-rise rounded-xl overflow-hidden border border-white/12 bg-[#14141A]">
      <div className="px-8 py-14 sm:px-12 sm:py-16 flex flex-col items-center justify-center gap-6">
        <div className="w-full max-w-[260px]">
          <svg
            viewBox="0 0 220 110"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Símbolo geométrico OS da Oficina Do Som"
            className="w-full h-auto"
          >
            <rect
              x="10"
              y="12"
              width="92"
              height="86"
              rx="4"
              stroke="#FFFFFF"
              strokeWidth="9"
            />
            <path
              d="M210 16H124V55H206V94H120"
              stroke="#8B35FF"
              strokeWidth="9"
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
          </svg>
        </div>

        <p className="font-display text-3xl sm:text-4xl font-bold tracking-wide text-white uppercase text-center">
          Oficina <span className="text-[#8B35FF]">Do Som</span>
        </p>
      </div>
    </div>
  );
}
