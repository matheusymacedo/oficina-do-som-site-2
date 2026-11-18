import { useState } from 'react';
import { ExternalLink, LocateFixed, MapPin, Minus, Plus } from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';

export function CruzeiroMap() {
  const [zoom, setZoom] = useState(1);
  const { location, city, state } = COMPANY_CONFIG;

  const fullAddress = location.streetAddress
    ? `${location.streetAddress}, ${city} - ${state}`
    : `${city} - ${state}`;

  if (location.googleMapsEmbedUrl) {
    return (
      <div className="rounded-xl overflow-hidden border border-white/10 bg-[#17171F]">
        <iframe
          title={`Mapa da ${COMPANY_CONFIG.name} em ${fullAddress}`}
          src={location.googleMapsEmbedUrl}
          className="w-full h-[320px] sm:h-[360px] border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    );
  }

  const handleZoomIn = () => setZoom((z) => Math.min(1.6, Number((z + 0.2).toFixed(1))));
  const handleZoomOut = () => setZoom((z) => Math.max(0.8, Number((z - 0.2).toFixed(1))));
  const handleReset = () => setZoom(1);

  return (
    <div className="rounded-xl overflow-hidden border border-white/10 bg-[#17171F]">
      <div className="px-5 py-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <MapPin className="w-4 h-4 text-[#8B35FF] shrink-0" aria-hidden="true" />
          <span className="text-sm font-semibold text-white truncate">{fullAddress}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleZoomOut}
            aria-label="Reduzir zoom do mapa"
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-white/10 bg-[#09090D] text-[#A5A5B0] hover:text-white hover:border-white/25 transition-colors"
          >
            <Minus className="w-4 h-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={handleZoomIn}
            aria-label="Ampliar zoom do mapa"
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-white/10 bg-[#09090D] text-[#A5A5B0] hover:text-white hover:border-white/25 transition-colors"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={handleReset}
            aria-label="Centralizar mapa na Oficina Do Som"
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-white/10 bg-[#09090D] text-[#A5A5B0] hover:text-white hover:border-white/25 transition-colors"
          >
            <LocateFixed className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="relative h-[280px] sm:h-[300px] bg-[#09090D] overflow-hidden select-none">
        <div
          className="w-full h-full transition-transform duration-200 ease-out origin-center"
          style={{ transform: `scale(${zoom})` }}
        >
          <svg
            viewBox="0 0 800 400"
            className="w-full h-full"
            role="img"
            aria-label={`Mapa de localização: ${fullAddress}`}
          >
            <rect width="800" height="400" fill="#101016" />

            {/* Malha de ruas */}
            <path
              d="M 60 225 L 740 190"
              fill="none"
              stroke="rgba(139,53,255,0.45)"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              d="M 100 105 L 710 140 M 110 310 L 690 285 M 235 40 L 255 370 M 405 35 L 395 375 M 575 45 L 555 365"
              fill="none"
              stroke="rgba(255,255,255,0.09)"
              strokeWidth="3"
              strokeLinecap="round"
            />

            <text
              x="230"
              y="188"
              fill="#C7C7D1"
              fontSize="12"
              fontFamily="Plus Jakarta Sans, sans-serif"
              transform="rotate(-2.8 230 188)"
            >
              R. Amador da Costa e Souza
            </text>

            <circle cx="400" cy="208" r="24" fill="rgba(139,53,255,0.22)" />
            <circle cx="400" cy="208" r="11" fill="#8B35FF" stroke="#FFFFFF" strokeWidth="2.5" />

            <text
              x="400"
              y="150"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="15"
              fontWeight="600"
              fontFamily="Plus Jakarta Sans, sans-serif"
            >
              Oficina Do Som · Nº 130
            </text>
          </svg>
        </div>

        <div className="absolute bottom-3 left-3 right-3 bg-[#17171F]/95 border border-white/10 rounded-lg px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="text-white font-medium">{fullAddress}</span>
          <a
            href={location.googleMapsSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-semibold text-[#8B35FF] hover:text-white transition-colors"
          >
            <span>Abrir no Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
