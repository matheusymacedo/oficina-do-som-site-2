import { COMPANY_CONFIG } from '../config/company';

const MARQUEE_ITEMS = [
  'Mais de 10 anos de experiência',
  `${COMPANY_CONFIG.location.streetAddress} · ${COMPANY_CONFIG.city} - ${COMPANY_CONFIG.state}`,
  'Mecânica geral',
  'Rádio automotivo',
  'Atendimento próximo e personalizado',
  `WhatsApp ${COMPANY_CONFIG.contact.whatsappDisplay}`,
];

function MarqueeSequence({ isDuplicate = false }: { isDuplicate?: boolean }) {
  return (
    <div
      aria-hidden={isDuplicate ? 'true' : undefined}
      className="flex items-center shrink-0 gap-8 sm:gap-10 pr-8 sm:pr-10"
    >
      {MARQUEE_ITEMS.map((item) => (
        <span key={`${isDuplicate ? 'dup' : 'main'}-${item}`} className="inline-flex items-center gap-8 sm:gap-10 whitespace-nowrap">
          <span className="text-xs sm:text-sm font-medium tracking-wide text-[#D4D4DC] uppercase">
            {item}
          </span>
          <span
            aria-hidden="true"
            className="w-1.5 h-1.5 rounded-full bg-[#8B35FF] shrink-0"
          />
        </span>
      ))}
    </div>
  );
}

export function InfoMarquee() {
  return (
    <section
      aria-label="Informações em destaque da Oficina Do Som"
      className="relative border-y border-white/10 bg-[#121218] overflow-hidden py-3.5 sm:py-4 select-none"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-[#09090D] to-transparent z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-[#09090D] to-transparent z-10"
      />

      <div className="flex w-max animate-marquee">
        <MarqueeSequence />
        <MarqueeSequence isDuplicate />
      </div>
    </section>
  );
}
