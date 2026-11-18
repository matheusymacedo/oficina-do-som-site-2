import { ArrowRight, MessageCircle } from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';
import { FAQ_ITEMS } from '../data/faq';
import { buildWhatsAppUrl, formatGeneralInquiryMessage } from '../utils/whatsapp';
import { FaqAccordion } from '../components/FaqAccordion';
import { RevealSection } from '../components/MotionPrimitives';

interface FaqPageProps {
  onNavigate: (path: string) => void;
}

export function FaqPage({ onNavigate }: FaqPageProps) {
  return (
    <div className="pt-28 pb-20 lg:pt-32 lg:pb-24 bg-[#09090D]">
      <div className="max-w-[920px] mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center max-w-2xl mx-auto space-y-4 mb-12 lg:mb-14">
          <div className="inline-flex items-center px-3.5 py-1 rounded-full border border-[#8B35FF]/35 bg-[#8B35FF]/10">
            <span className="text-xs font-semibold tracking-wider uppercase text-[#C89EFF]">
              Dúvidas frequentes
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[0.98]">
            PERGUNTAS <span className="text-[#8B35FF]">FREQUENTES</span>
          </h1>

          <p className="text-base sm:text-lg text-[#A5A5B0] leading-relaxed">
            Reunimos as dúvidas mais comuns sobre nossos serviços, localização na{' '}
            {COMPANY_CONFIG.location.streetAddress} e como funciona o atendimento pelo WhatsApp.
          </p>
        </header>

        <FaqAccordion items={FAQ_ITEMS} defaultOpenId={FAQ_ITEMS[0].id} />

        <RevealSection delay={0.12} variant="up" className="mt-12">
          <div className="rounded-xl border border-white/10 bg-[#14141A] p-7 sm:p-9 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <h2 className="font-sans text-xl sm:text-2xl font-bold text-white">
                Ainda ficou com alguma dúvida?
              </h2>
              <p className="text-sm sm:text-base text-[#A5A5B0]">
                Fale direto com a equipe pelo WhatsApp ou solicite um horário na oficina.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={buildWhatsAppUrl(formatGeneralInquiryMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 min-h-[46px] px-5 py-2.5 rounded-lg bg-[#8B35FF] hover:bg-[#6424C7] active:scale-[0.98] text-white font-semibold text-sm transition-all duration-150 whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Chamar no WhatsApp</span>
              </a>

              <a
                href="/contato"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/contato');
                }}
                className="inline-flex items-center justify-center gap-2 min-h-[46px] px-5 py-2.5 rounded-lg border border-white/15 bg-[#17171F] hover:border-white/30 text-white font-medium text-sm transition-colors whitespace-nowrap"
              >
                <span>Agendar atendimento</span>
                <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>
            </div>
          </div>
        </RevealSection>
      </div>
    </div>
  );
}
