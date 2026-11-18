import { ArrowRight, Check, MessageCircle, Radio, Wrench } from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';
import { SERVICES_LIST, type ServiceIconKey } from '../data/services';
import { buildWhatsAppUrl, formatServiceInquiryMessage } from '../utils/whatsapp';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { RevealSection } from '../components/MotionPrimitives';

interface ServicesPageProps {
  onNavigate: (path: string) => void;
}

function renderServiceIcon(icon: ServiceIconKey) {
  if (icon === 'radio') {
    return <Radio className="w-4 h-4 text-[#8B35FF]" aria-hidden="true" />;
  }
  return <Wrench className="w-4 h-4 text-[#8B35FF]" aria-hidden="true" />;
}

export function ServicesPage({ onNavigate }: ServicesPageProps) {
  return (
    <div className="pt-28 pb-20 lg:pt-32 lg:pb-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <header className="max-w-3xl space-y-4">
          <p className="animate-hero-rise text-sm font-medium text-[#A5A5B0]">
            Serviços · {COMPANY_CONFIG.location.streetAddress}, {COMPANY_CONFIG.city} -{' '}
            {COMPANY_CONFIG.state}
          </p>
          <h1
            style={{ animationDelay: '80ms' }}
            className="animate-hero-rise font-sans text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight text-balance"
          >
            Atendimento automotivo com experiência e cuidado
          </h1>
          <p
            style={{ animationDelay: '150ms' }}
            className="animate-hero-rise text-base sm:text-lg text-[#A5A5B0] leading-relaxed"
          >
            Conheça os serviços realizados na Oficina Do Som para veículos de diferentes categorias.
            Fale direto com a equipe pelo WhatsApp para tirar dúvidas ou pedir um orçamento.
          </p>
        </header>

        <div className="space-y-8">
          {SERVICES_LIST.map((service, idx) => (
            <RevealSection key={service.id} delay={idx * 0.08} variant="up">
              <article className="group rounded-xl border border-white/10 bg-[#14141A] overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch hover:border-white/25 transition-colors duration-200">
                <div className="lg:col-span-5 relative min-h-[260px] bg-[#09090D] overflow-hidden">
                  <ImageWithFallback
                    src={service.image}
                    alt={service.imageAlt}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    className="w-full h-full lg:h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                </div>

                <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2.5 text-xs font-medium text-[#A5A5B0]">
                      {renderServiceIcon(service.icon)}
                      <span>{COMPANY_CONFIG.name}</span>
                    </div>

                    <h2 className="font-sans text-2xl sm:text-3xl font-bold text-white">
                      {service.name}
                    </h2>

                    <p className="text-sm sm:text-base text-[#A5A5B0] leading-relaxed">
                      {service.detailedDescription}
                    </p>

                    <ul className="pt-2 space-y-2.5">
                      {service.highlights.map((point) => (
                        <li key={point} className="flex items-start gap-2.5 text-sm text-white/90">
                          <Check className="w-4 h-4 text-[#8B35FF] shrink-0 mt-0.5" aria-hidden="true" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center gap-3">
                    <a
                      href={buildWhatsAppUrl(formatServiceInquiryMessage(service.whatsappTopic))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 min-h-[46px] px-6 py-3 rounded-lg bg-[#8B35FF] hover:bg-[#6424C7] active:scale-[0.98] text-white font-semibold text-sm transition-all whitespace-nowrap"
                    >
                      <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>Solicitar orçamento</span>
                    </a>

                    <a
                      href="/contato"
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate('/contato');
                      }}
                      className="inline-flex items-center justify-center gap-2 min-h-[46px] px-5 py-3 rounded-lg border border-white/15 bg-[#09090D] hover:border-white/30 text-sm font-medium text-white transition-colors whitespace-nowrap"
                    >
                      <span>Agendar horário</span>
                      <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </article>
            </RevealSection>
          ))}
        </div>
      </div>
    </div>
  );
}
