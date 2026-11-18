import { ArrowRight, MessageCircle } from 'lucide-react';
import { COMPANY_CONFIG, HERO_MEDIA } from '../config/company';
import { buildWhatsAppUrl, formatGeneralInquiryMessage } from '../utils/whatsapp';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { RevealSection } from '../components/MotionPrimitives';
import { SymbolShowcase } from '../components/SymbolShowcase';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

const PILLARS = [
  {
    title: 'Mais de 10 anos de experiência',
    description:
      'Mais de uma década de atuação contínua no setor automotivo em Cruzeiro - SP, acompanhando diferentes gerações e categorias de veículos.',
  },
  {
    title: 'Compromisso com os clientes',
    description:
      'Relação direta, clara e respeitosa com quem confia o carro à oficina, priorizando atendimento próximo e comunicação transparente.',
  },
  {
    title: 'Dedicação ao setor automotivo',
    description:
      'Atuação em mecânica geral e serviços relacionados a rádio automotivo com cuidado técnico no dia a dia.',
  },
];

export function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="pt-28 pb-20 lg:pt-32 lg:pb-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <p className="animate-hero-rise text-sm font-medium text-[#A5A5B0]">
                Sobre nós · {COMPANY_CONFIG.location.streetAddress}, {COMPANY_CONFIG.city} -{' '}
                {COMPANY_CONFIG.state}
              </p>
              <h1
                style={{ animationDelay: '80ms' }}
                className="animate-hero-rise font-sans text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight text-balance"
              >
                Mais de 10 anos cuidando de veículos em Cruzeiro
              </h1>
              <p
                style={{ animationDelay: '150ms' }}
                className="animate-hero-rise text-base sm:text-lg text-[#A5A5B0] leading-relaxed"
              >
                A Oficina Do Som atua em Cruzeiro - SP há mais de 10 anos, atendendo proprietários
                de veículos de diferentes categorias na {COMPANY_CONFIG.location.streetAddress}.
              </p>
              <p
                style={{ animationDelay: '210ms' }}
                className="animate-hero-rise text-base text-[#A5A5B0] leading-relaxed"
              >
                Construímos nossa reputação no dia a dia da oficina, mantendo o compromisso com a
                qualidade em mecânica geral e nos serviços relacionados a rádio automotivo.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="/contato"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/contato');
                }}
                className="group inline-flex items-center justify-center gap-2 min-h-[46px] px-6 py-3 rounded-lg bg-[#8B35FF] hover:bg-[#6424C7] active:scale-[0.98] text-white font-semibold text-sm transition-all duration-150 whitespace-nowrap"
              >
                <span>Agendar atendimento</span>
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
              <a
                href={buildWhatsAppUrl(formatGeneralInquiryMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 min-h-[46px] px-5 py-3 rounded-lg border border-white/15 bg-[#17171F] hover:border-white/30 text-sm font-medium text-white transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 text-[#8B35FF]" aria-hidden="true" />
                <span>Falar pelo WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <SymbolShowcase />
          </div>
        </header>

        <section
          aria-labelledby="about-pillars-title"
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pt-10 border-t border-white/10"
        >
          <RevealSection variant="left" className="lg:col-span-4 space-y-2">
            <p className="text-sm font-medium text-[#A5A5B0]">Nossa atuação</p>
            <h2
              id="about-pillars-title"
              className="font-sans text-2xl sm:text-3xl font-bold text-white"
            >
              Como trabalhamos no dia a dia
            </h2>
            <p className="text-sm sm:text-base text-[#A5A5B0]">
              Valores simples e práticos que guiam cada atendimento em Cruzeiro - SP.
            </p>
          </RevealSection>

          <div className="lg:col-span-8 border-b border-white/10">
            {PILLARS.map((pillar, idx) => (
              <RevealSection key={pillar.title} delay={idx * 0.06} variant="up">
                <article className="border-t border-white/10 py-6">
                  <h3 className="font-sans text-xl font-semibold text-white">{pillar.title}</h3>
                  <p className="mt-1.5 text-sm sm:text-base text-[#A5A5B0] leading-relaxed">
                    {pillar.description}
                  </p>
                </article>
              </RevealSection>
            ))}
          </div>
        </section>

        <RevealSection variant="up">
          <div className="rounded-xl border border-white/10 bg-[#14141A] p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 aspect-[16/10] rounded-lg overflow-hidden border border-white/10 bg-[#09090D]">
              <ImageWithFallback
                src={HERO_MEDIA.aboutBayImage}
                alt={HERO_MEDIA.aboutBayAlt}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:col-span-6 space-y-4">
              <p className="text-sm font-medium text-[#A5A5B0]">
                {COMPANY_CONFIG.location.streetAddress} · {COMPANY_CONFIG.city} -{' '}
                {COMPANY_CONFIG.state}
              </p>
              <h2 className="font-sans text-2xl sm:text-3xl font-bold text-white">
                Atendimento de perto para o seu carro
              </h2>
              <p className="text-sm sm:text-base text-[#A5A5B0] leading-relaxed">
                Seja para serviços de mecânica geral ou para o sistema de rádio automotivo, nossa
                equipe está pronta para atender e orientar você com clareza.
              </p>
              <div className="pt-1">
                <a
                  href="/servicos"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/servicos');
                  }}
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[#8B35FF] transition-colors"
                >
                  <span>Explorar serviços disponíveis</span>
                  <ArrowRight
                    className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>
          </div>
        </RevealSection>
      </div>
    </div>
  );
}
