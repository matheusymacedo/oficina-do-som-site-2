export interface AppointmentFormData {
  name: string;
  phone: string;
  vehicleModel: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  description: string;
}

export type AppointmentFormErrors = Partial<Record<keyof AppointmentFormData, string>>;

export function digitsOnly(value: string): string {
  return value.replace(/\D/g, '');
}

export function formatBrazilianPhone(value: string): string {
  const digits = digitsOnly(value).slice(0, 11);

  if (digits.length <= 2) {
    return digits.length > 0 ? `(${digits}` : '';
  }
  if (digits.length <= 6) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function validateAppointmentForm(
  data: AppointmentFormData,
  referenceDateIso?: string,
): AppointmentFormErrors {
  const errors: AppointmentFormErrors = {};

  if (data.name.trim().length < 2) {
    errors.name = 'Informe seu nome completo.';
  }

  const phoneDigits = digitsOnly(data.phone);
  if (phoneDigits.length < 10 || phoneDigits.length > 11) {
    errors.phone = 'Informe um telefone ou WhatsApp válido com DDD.';
  }

  if (data.vehicleModel.trim().length < 2) {
    errors.vehicleModel = 'Informe o modelo do veículo.';
  }

  if (data.service.trim().length === 0) {
    errors.service = 'Selecione o serviço desejado.';
  }

  if (data.preferredDate.trim().length === 0) {
    errors.preferredDate = 'Escolha a data desejada.';
  } else if (referenceDateIso && data.preferredDate < referenceDateIso) {
    errors.preferredDate = 'Escolha uma data igual ou posterior a hoje.';
  }

  if (data.preferredTime.trim().length === 0) {
    errors.preferredTime = 'Informe o horário desejado.';
  }

  if (data.description.trim().length < 5) {
    errors.description = 'Descreva brevemente o que você precisa.';
  }

  return errors;
}

export function formatDisplayDate(isoDate: string): string {
  const parts = isoDate.split('-');
  if (parts.length !== 3) {
    return isoDate;
  }
  const [year, month, day] = parts;
  return `${day}/${month}/${year}`;
}

export function formatAppointmentMessage(data: AppointmentFormData): string {
  const formattedDate = formatDisplayDate(data.preferredDate.trim());

  return [
    'Olá, Oficina Do Som! Gostaria de solicitar um agendamento de atendimento:',
    '',
    `Nome: ${data.name.trim()}`,
    `Telefone: ${data.phone.trim()}`,
    `Veículo: ${data.vehicleModel.trim()}`,
    `Serviço desejado: ${data.service.trim()}`,
    `Data desejada: ${formattedDate}`,
    `Horário desejado: ${data.preferredTime.trim()}`,
    `Descrição: ${data.description.trim()}`,
    '',
    'Aguardo a confirmação de disponibilidade pela equipe.',
  ].join('\n');
}
