import { COMPANY_CONFIG } from '../config/company';

export function buildWhatsAppUrl(
  message?: string,
  phoneNumber: string = COMPANY_CONFIG.contact.whatsappNumber,
): string {
  const cleanDigits = phoneNumber.replace(/\D/g, '');
  const baseUrl = `https://wa.me/${cleanDigits}`;

  if (!message || message.trim().length === 0) {
    return baseUrl;
  }

  return `${baseUrl}?text=${encodeURIComponent(message.trim())}`;
}

export function formatServiceInquiryMessage(serviceName: string): string {
  return [
    'Olá, equipe da Oficina Do Som!',
    `Gostaria de solicitar atendimento e informações sobre: ${serviceName}.`,
    'Podem me ajudar?',
  ].join('\n');
}

export function formatGeneralInquiryMessage(): string {
  return [
    'Olá, equipe da Oficina Do Som!',
    'Vim pelo site e gostaria de solicitar um atendimento para o meu veículo.',
  ].join('\n');
}
