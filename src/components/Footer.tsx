import { Mail, MapPin, Phone } from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';
import { SERVICES_LIST } from '../data/services';
import { APP_ROUTES } from '../utils/routes';
import { buildWhatsAppUrl, formatGeneralInquiryMessage } from '../utils/whatsapp';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    event.preventDefault();
    onNavigate(path);
  };

  return (
    <footer className="bg-[#09090D] border-t border-white/10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          <div className="lg:col-span-4 space-y-4">
            <a
              href="/"
              onClick={(e) => handleLinkClick(e, '/')}
              className="inline-flex items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8B35FF] rounded"
            >
              <BrandLogo size="md" />
            </a>
            <p className="text-sm leading-relaxed text-[#A5A5B0] max-w-sm">
              Oficina automotiva em {COMPANY_CONFIG.city} - {COMPANY_CONFIG.state} com{' '}
              {COMPANY_CONFIG.experienceBadge.toLowerCase()}. Atendimento próximo em mecânica geral
              e serviços relacionados a rádio automotivo.
            </p>
            {COMPANY_CONFIG.socialLinks.length > 0 && (
              <div className="pt-2 flex flex-wrap gap-4">
                {COMPANY_CONFIG.socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-[#A5A5B0] hover:text-white transition-colors"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-sm font-semibold tracking-wide text-white uppercase">
              Navegação
            </h2>
            <ul className="space-y-2.5">
              {APP_ROUTES.map((route) => (
                <li key={route.id}>
                  <a
                    href={route.path}
                    onClick={(e) => handleLinkClick(e, route.path)}
                    className="text-sm text-[#A5A5B0] hover:text-white transition-colors"
                  >
                    {route.navLabel}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-sm font-semibold tracking-wide text-white uppercase">
              Serviços
            </h2>
            <ul className="space-y-2.5">
              {SERVICES_LIST.map((service) => (
                <li key={service.id}>
                  <a
                    href="/servicos"
                    onClick={(e) => handleLinkClick(e, '/servicos')}
                    className="text-sm text-[#A5A5B0] hover:text-white transition-colors"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <h2 className="text-sm font-semibold tracking-wide text-white uppercase">
              Contato
            </h2>
            <ul className="space-y-3 text-sm text-[#A5A5B0]">
              <li>
                <a
                  href={buildWhatsAppUrl(formatGeneralInquiryMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#8B35FF] shrink-0" aria-hidden="true" />
                  <span className="tabular-nums">{COMPANY_CONFIG.contact.whatsappDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${COMPANY_CONFIG.contact.email}`}
                  className="inline-flex items-center gap-2.5 hover:text-white transition-colors break-words"
                >
                  <Mail className="w-4 h-4 text-[#8B35FF] shrink-0" aria-hidden="true" />
                  <span>{COMPANY_CONFIG.contact.email}</span>
                </a>
              </li>
              <li className="inline-flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#8B35FF] shrink-0 mt-0.5" aria-hidden="true" />
                <a
                  href={COMPANY_CONFIG.location.googleMapsSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {COMPANY_CONFIG.location.streetAddress
                    ? `${COMPANY_CONFIG.location.streetAddress} — ${COMPANY_CONFIG.city} - ${COMPANY_CONFIG.state}`
                    : `${COMPANY_CONFIG.city} - ${COMPANY_CONFIG.state}, ${COMPANY_CONFIG.country}`}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#A5A5B0]">
          <p>
            © {currentYear} {COMPANY_CONFIG.name}. Todos os direitos reservados.
          </p>
          <p>
            {COMPANY_CONFIG.city} - {COMPANY_CONFIG.state} · {COMPANY_CONFIG.segment}
          </p>
        </div>
      </div>
    </footer>
  );
}
