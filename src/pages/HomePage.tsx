import { ArrowRight, MessageCircle, Radio, Wrench } from 'lucide-react';
import { COMPANY_CONFIG, HERO_MEDIA } from '../config/company';
import { FAQ_ITEMS } from '../data/faq';
import { SERVICES_LIST, type ServiceIconKey } from '../data/services';
import { buildWhatsAppUrl, formatGeneralInquiryMessage, formatServiceInquiryMessage } from '../utils/whatsapp';
import { FaqAccordion } from '../components/FaqAccordion';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { InfoMarquee } from '../components/InfoMarquee';
import { RevealSection } from '../components/MotionPrimitives';
import { ReviewsSection } from '../components/ReviewsSection';
import { SymbolShowcase } from '../components/SymbolShowcase';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

function renderServiceIcon(icon: ServiceIconKey) {
  if (icon === 'radio') {
    return <Radio className="w-4 h-4 text-[#8B35FF]" aria-hidden="true" />;
  }
  return <Wrench className="w-4 h-4 text-[#8B35FF]" aria-hidden="true" />;
}

const DIFFERENTIALS = [
  {
    title: 'Mais de 10 anos de experiência',
    description:
      'Presença consolidada em Cruzeiro - SP, cuidando do carro de motoristas da cidade e região com responsabilidade.',
  },
  {
    title: 'Atendimento próximo e personalizado',
    description:
      'Aqui você conversa direto com quem atende o seu veículo, com explicações simples e sem rodeios.',
  },
  {
    title: 'Compromisso com a qualidade',
    description:
      'Atenção em cada detalhe do trabalho realizado, do primeiro contato até a entrega do carro.',
  },
  {
    title: 'Serviços automotivos',
    description:
      'Atendimento para veículos de diferentes categorias em mecânica geral e rádio automotivo.',
  },
];

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div>
      {/* HERO SECTION */}
      <section
        aria-labelledby="hero-heading"
        className="pt-28 pb-12 lg:pt-32 lg:pb-16 bg-[#09090D]"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <p className="animate-hero-rise text-sm font-medium text-[#A5A5B0]">
                {COMPANY_CONFIG.location.streetAddress} · {COMPANY_CONFIG.city},{' '}
                {COMPANY_CONFIG.state}
              </p>

              <h1
                id="hero-heading"
                style={{ animationDelay: '90ms' }}
                className="animate-hero-rise font-display font-bold tracking-tight text-white text-[clamp(2.5rem,5vw,4rem)] leading-[0.98] text-balance"
              >
                SEU CARRO MERECE O MELHOR CUIDADO.
              </h1>

              <p
                style={{ animationDelay: '160ms' }}
                className="animate-hero-rise text-base sm:text-lg text-[#A5A5B0] leading-relaxed max-w-xl"
              >
                Mais de 10 anos de experiência, dedicação e compromisso com a qualidade. Conheça a
                Oficina Do Som.
              </p>

              <div
                style={{ animationDelay: '220ms' }}
                className="animate-hero-rise pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5"
              >
                <a
                  href="/contato"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/contato');
                  }}
                  className="group inline-flex items-center justify-center gap-2.5 min-h-[48px] px-6 py-3 rounded-lg bg-[#8B35FF] hover:bg-[#6424C7] active:scale-[0.98] text-white font-semibold text-sm sm:text-base transition-all duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <span>Solicitar atendimento</span>
                  <ArrowRight
                    className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </a>

                <a
                  href="/servicos"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/servicos');
                  }}
                  className="inline-flex items-center justify-center min-h-[48px] px-6 py-3 rounded-lg border border-white/15 bg-[#17171F] hover:border-white/30 active:scale-[0.98] text-white font-medium text-sm sm:text-base transition-all duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B35FF]"
                >
                  Conhecer nossos serviços
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <SymbolShowcase />
            </div>
          </div>
        </div>
      </section>

      {/* FAIXA DE INFORMAÇÕES ROLANDO HORIZONTALMENTE */}
      <InfoMarquee />

      {/* DIFERENCIAIS */}
      <section
        aria-labelledby="differentials-heading"
        className="py-16 lg:py-20 border-t border-white/10 bg-[#09090D]"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <RevealSection variant="left" className="lg:col-span-5 space-y-3">
              <p className="text-sm font-medium text-[#A5A5B0]">Por que a Oficina Do Som</p>
              <h2
                id="differentials-heading"
                className="font-sans text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight text-balance"
              >
                Atendimento direto para quem precisa confiar no serviço
              </h2>
              <p className="text-sm sm:text-base text-[#A5A5B0] leading-relaxed">
                Mais de 10 anos trabalhando na cidade, mantendo uma conversa clara e honesta com
                cada cliente que traz o carro até a oficina.
              </p>
            </RevealSection>

            <div className="lg:col-span-7 border-b border-white/10">
              {DIFFERENTIALS.map((item, idx) => (
                <RevealSection key={item.title} delay={idx * 0.05} variant="up">
                  <article className="border-t border-white/10 py-5 sm:py-6">
                    <h3 className="font-sans text-lg sm:text-xl font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-[#A5A5B0] leading-relaxed">
                      {item.description}
                    </p>
                  </article>
                </RevealSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVIÇOS */}
      <section
        id="servicos-destaque"
        aria-labelledby="home-services-heading"
        className="py-16 lg:py-20 border-t border-white/10 bg-[#09090D]"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="space-y-2 max-w-2xl">
              <p className="text-sm font-medium text-[#A5A5B0]">Nossos serviços</p>
              <h2
                id="home-services-heading"
                className="font-sans text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white"
              >
                Como podemos ajudar com o seu veículo
              </h2>
            </div>

            <a
              href="/servicos"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/servicos');
              }}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[#8B35FF] transition-colors whitespace-nowrap shrink-0"
            >
              <span>Ver detalhes dos serviços</span>
              <ArrowRight
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
          </RevealSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {SERVICES_LIST.map((service, idx) => (
              <RevealSection key={service.id} delay={idx * 0.08} variant="up">
                <article className="group h-full rounded-xl border border-white/10 bg-[#14141A] overflow-hidden flex flex-col hover:border-white/25 transition-colors duration-200">
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#09090D]">
                    <ImageWithFallback
                      src={service.image}
                      alt={service.imageAlt}
                      className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    />
                  </div>

                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-xs font-medium text-[#A5A5B0]">
                        {renderServiceIcon(service.icon)}
                        <span>Serviço automotivo</span>
                      </div>

                      <h3 className="font-sans text-2xl font-bold text-white">{service.name}</h3>

                      <p className="text-sm sm:text-base text-[#A5A5B0] leading-relaxed">
                        {service.shortDescription}
                      </p>
                    </div>

                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <a
                        href={buildWhatsAppUrl(formatServiceInquiryMessage(service.whatsappTopic))}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-lg bg-[#8B35FF] hover:bg-[#6424C7] active:scale-[0.98] text-white font-semibold text-sm transition-all duration-150 whitespace-nowrap"
                      >
                        <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>Solicitar atendimento</span>
                      </a>
                      <a
                        href="/servicos"
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigate('/servicos');
                        }}
                        className="inline-flex items-center justify-center min-h-[44px] px-4 py-2.5 rounded-lg border border-white/15 hover:border-white/30 text-sm font-medium text-white transition-colors whitespace-nowrap"
                      >
                        Ver mais
                      </a>
                    </div>
                  </div>
                </article>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* SOBRE A OFICINA */}
      <section
        aria-labelledby="home-about-heading"
        className="py-16 lg:py-20 border-t border-white/10 bg-[#09090D]"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            <RevealSection variant="left" className="lg:col-span-6">
              <div className="relative h-full min-h-[280px] rounded-xl overflow-hidden border border-white/10 bg-[#14141A] group">
                <ImageWithFallback
                  src={HERO_MEDIA.aboutBayImage}
                  alt={HERO_MEDIA.aboutBayAlt}
                  className="w-full h-full lg:h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              </div>
            </RevealSection>

            <RevealSection
              variant="right"
              delay={0.08}
              className="lg:col-span-6 flex flex-col justify-between gap-6"
            >
              <div className="space-y-4">
                <p className="text-sm font-medium text-[#A5A5B0]">Sobre a oficina</p>
                <h2
                  id="home-about-heading"
                  className="font-display text-[1.75rem] sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.04] text-balance"
                >
                  EXPERIÊNCIA QUE FAZ A DIFERENÇA.
                </h2>
                <p className="text-base text-[#A5A5B0] leading-relaxed">
                  Localizada na {COMPANY_CONFIG.location.streetAddress}, em Cruzeiro - SP, a
                  Oficina Do Som soma mais de 10 anos de trabalho atendendo veículos de diferentes
                  categorias.
                </p>
                <p className="text-base text-[#A5A5B0] leading-relaxed">
                  Nosso foco é oferecer atendimento próximo, transparente e cuidadoso tanto na
                  mecânica geral quanto nos serviços de rádio automotivo.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href="/sobre"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/sobre');
                  }}
                  className="group inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-lg border border-white/15 bg-[#17171F] hover:border-white/30 text-sm font-semibold text-white transition-colors whitespace-nowrap"
                >
                  <span>Conhecer nossa história</span>
                  <ArrowRight
                    className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* AVALIAÇÕES */}
      <ReviewsSection />

      {/* PERGUNTAS FREQUENTES (REFERÊNCIA CHAGURI) */}
      <section
        aria-labelledby="home-faq-heading"
        className="py-16 lg:py-20 border-t border-white/10 bg-[#09090D]"
      >
        <div className="max-w-[920px] mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection variant="up" className="text-center max-w-2xl mx-auto space-y-3 mb-10">
            <div className="inline-flex items-center px-3.5 py-1 rounded-full border border-[#8B35FF]/35 bg-[#8B35FF]/10">
              <span className="text-xs font-semibold tracking-wider uppercase text-[#C89EFF]">
                Dúvidas frequentes
              </span>
            </div>
            <h2
              id="home-faq-heading"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.02]"
            >
              PERGUNTAS <span className="text-[#8B35FF]">FREQUENTES</span>
            </h2>
            <p className="text-sm sm:text-base text-[#A5A5B0]">
              Respostas rápidas sobre mecânica geral, rádio automotivo e agendamento pelo WhatsApp.
            </p>
          </RevealSection>

          <FaqAccordion items={FAQ_ITEMS.filter((item) => item.featuredOnHome)} />

          <RevealSection delay={0.1} variant="up" className="mt-8 text-center">
            <a
              href="/perguntas-frequentes"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/perguntas-frequentes');
              }}
              className="group inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-lg border border-white/15 bg-[#17171F] hover:border-[#8B35FF]/60 text-sm font-semibold text-white transition-colors whitespace-nowrap"
            >
              <span>Ver todas as perguntas frequentes</span>
              <ArrowRight
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
          </RevealSection>
        </div>
      </section>

      {/* CHAMADA PARA AÇÃO FINAL */}
      <section
        aria-labelledby="home-cta-heading"
        className="py-16 lg:py-20 border-t border-white/10 bg-[#09090D]"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection variant="up">
            <div className="rounded-xl border border-white/12 bg-[#14141A] p-8 sm:p-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="space-y-2.5 max-w-2xl">
                <h2
                  id="home-cta-heading"
                  className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white text-balance"
                >
                  PRECISA DE ATENDIMENTO PARA SEU VEÍCULO?
                </h2>
                <p className="text-base sm:text-lg text-[#A5A5B0]">
                  Entre em contato com nossa equipe e solicite seu atendimento.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                <a
                  href={buildWhatsAppUrl(formatGeneralInquiryMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 min-h-[48px] px-7 py-3 rounded-lg bg-[#8B35FF] hover:bg-[#6424C7] active:scale-[0.98] text-white font-semibold text-sm sm:text-base transition-all duration-150 whitespace-nowrap"
                >
                  <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
                  <span>Falar pelo WhatsApp</span>
                </a>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>
    </div>
  );
}
