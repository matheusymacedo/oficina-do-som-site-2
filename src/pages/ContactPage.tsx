import { Clock, ExternalLink, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';
import { buildWhatsAppUrl, formatGeneralInquiryMessage } from '../utils/whatsapp';
import { AppointmentForm } from '../components/AppointmentForm';
import { CruzeiroMap } from '../components/CruzeiroMap';

export function ContactPage() {
  return (
    <div className="pt-28 pb-20 lg:pt-32 lg:pb-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <header className="max-w-3xl space-y-4">
          <p className="animate-hero-rise text-sm font-medium text-[#A5A5B0]">
            Contato e agendamento · {COMPANY_CONFIG.city} - {COMPANY_CONFIG.state}
          </p>
          <h1
            style={{ animationDelay: '80ms' }}
            className="animate-hero-rise font-sans text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight text-balance"
          >
            Fale com a equipe da Oficina Do Som
          </h1>
          <p
            style={{ animationDelay: '150ms' }}
            className="animate-hero-rise text-base sm:text-lg text-[#A5A5B0] leading-relaxed"
          >
            Solicite um horário pelo formulário abaixo ou entre em contato direto pelo WhatsApp,
            e-mail ou visitando a oficina na {COMPANY_CONFIG.location.streetAddress}.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <AppointmentForm />
          </div>

          <aside className="lg:col-span-5 space-y-6">
            <div className="rounded-xl border border-white/10 bg-[#17171F] p-6 sm:p-7 space-y-6">
              <h2 className="font-sans text-xl sm:text-2xl font-bold text-white">
                Canais de atendimento
              </h2>

              <div className="space-y-5">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-[#09090D] border border-white/10 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-[#8B35FF]" aria-hidden="true" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-[#A5A5B0]">WhatsApp</p>
                    <a
                      href={buildWhatsAppUrl(formatGeneralInquiryMessage())}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-semibold text-white hover:text-[#8B35FF] transition-colors tabular-nums"
                    >
                      {COMPANY_CONFIG.contact.whatsappDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-[#09090D] border border-white/10 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-[#8B35FF]" aria-hidden="true" />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <p className="text-xs font-medium text-[#A5A5B0]">E-mail</p>
                    <a
                      href={`mailto:${COMPANY_CONFIG.contact.email}`}
                      className="text-sm sm:text-base font-semibold text-white hover:text-[#8B35FF] transition-colors break-all"
                    >
                      {COMPANY_CONFIG.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-[#09090D] border border-white/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-[#8B35FF]" aria-hidden="true" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-[#A5A5B0]">Endereço</p>
                    <p className="text-sm sm:text-base font-semibold text-white">
                      {COMPANY_CONFIG.location.streetAddress}, {COMPANY_CONFIG.city} -{' '}
                      {COMPANY_CONFIG.state}
                    </p>
                    <a
                      href={COMPANY_CONFIG.location.googleMapsSearchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#8B35FF] hover:text-white transition-colors"
                    >
                      <span>Ver rota no Google Maps</span>
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </div>

                {COMPANY_CONFIG.businessHours.length > 0 && (
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-[#09090D] border border-white/10 flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4 text-[#8B35FF]" aria-hidden="true" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-[#A5A5B0]">Horário de atendimento</p>
                      <ul className="space-y-1 text-sm text-white">
                        {COMPANY_CONFIG.businessHours.map((item) => (
                          <li key={item.days}>
                            {item.days}: {item.hours}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3">
                <a
                  href={buildWhatsAppUrl(formatGeneralInquiryMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-lg bg-[#8B35FF] hover:bg-[#6424C7] text-white text-sm font-semibold transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Abrir WhatsApp</span>
                </a>
                <a
                  href={`mailto:${COMPANY_CONFIG.contact.email}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-lg border border-white/15 bg-[#09090D] hover:border-white/30 text-white text-sm font-medium transition-colors whitespace-nowrap"
                >
                  <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Enviar e-mail</span>
                </a>
              </div>
            </div>

            <CruzeiroMap />
          </aside>
        </div>
      </div>
    </div>
  );
}
