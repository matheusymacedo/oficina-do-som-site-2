import { MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl, formatGeneralInquiryMessage } from '../utils/whatsapp';

export function FloatingWhatsApp() {
  const whatsappUrl = buildWhatsAppUrl(formatGeneralInquiryMessage());

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a Oficina Do Som pelo WhatsApp"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 inline-flex items-center justify-center gap-2.5 h-12 w-12 sm:w-auto sm:px-5 rounded-full bg-[#8B35FF] hover:bg-[#6424C7] text-white font-semibold text-sm shadow-lg shadow-black/40 border border-white/15 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
      <span className="hidden sm:inline whitespace-nowrap">WhatsApp</span>
    </a>
  );
}
