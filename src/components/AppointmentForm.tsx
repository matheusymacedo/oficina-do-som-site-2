import { useEffect, useRef, useState } from 'react';
import { Check, Copy, ExternalLink, Loader2, MessageCircle } from 'lucide-react';
import { SERVICES_LIST } from '../data/services';
import {
  formatAppointmentMessage,
  formatBrazilianPhone,
  validateAppointmentForm,
  type AppointmentFormData,
  type AppointmentFormErrors,
} from '../utils/scheduling';
import { buildWhatsAppUrl } from '../utils/whatsapp';

interface AppointmentFormProps {
  defaultService?: string;
}

const TIME_SLOTS = [
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '13:30',
  '14:30',
  '15:30',
  '16:30',
  '17:30',
];

function getTodayIso(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function AppointmentForm({ defaultService }: AppointmentFormProps) {
  const todayIso = getTodayIso();

  const [formData, setFormData] = useState<AppointmentFormData>({
    name: '',
    phone: '',
    vehicleModel: '',
    service: defaultService || SERVICES_LIST[0]?.name || 'Mecânica geral',
    preferredDate: '',
    preferredTime: '',
    description: '',
  });

  const [errors, setErrors] = useState<AppointmentFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preparedSubmission, setPreparedSubmission] = useState<{
    message: string;
    whatsappUrl: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);
  const confirmationRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (preparedSubmission && confirmationRef.current) {
      confirmationRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [preparedSubmission]);

  const handleFieldChange = (field: keyof AppointmentFormData, value: string) => {
    const nextValue = field === 'phone' ? formatBrazilianPhone(value) : value;
    setFormData((prev) => ({ ...prev, [field]: nextValue }));
    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateAppointmentForm(formData, todayIso);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    window.setTimeout(() => {
      const message = formatAppointmentMessage(formData);
      const whatsappUrl = buildWhatsAppUrl(message);
      setPreparedSubmission({ message, whatsappUrl });
      setIsSubmitting(false);
    }, 260);
  };

  const handleCopyMessage = async () => {
    if (!preparedSubmission) return;
    try {
      await navigator.clipboard.writeText(preparedSubmission.message);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  if (preparedSubmission) {
    return (
      <div
        ref={confirmationRef}
        role="status"
        aria-live="polite"
        className="scroll-mt-24 rounded-xl border border-[#8B35FF]/40 bg-[#17171F] p-6 sm:p-8 space-y-6"
      >
        <div className="space-y-2">
          <p className="text-xs font-medium tracking-wide text-[#8B35FF] uppercase">
            Solicitação preparada · Aguardando envio e confirmação
          </p>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
            Mensagem pronta para enviar no WhatsApp
          </h3>
          <p className="text-sm text-[#A5A5B0] leading-relaxed">
            O horário ainda não está confirmado. Clique no botão abaixo para abrir o WhatsApp da
            Oficina Do Som com os dados preenchidos e aguardar a confirmação da nossa equipe.
          </p>
        </div>

        <div className="rounded-lg bg-[#09090D] border border-white/10 p-4">
          <pre className="whitespace-pre-wrap font-sans text-sm text-white/90 leading-relaxed">
            {preparedSubmission.message}
          </pre>
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
          <a
            href={preparedSubmission.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-lg bg-[#8B35FF] hover:bg-[#6424C7] text-white font-semibold text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Enviar solicitação pelo WhatsApp</span>
            <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={handleCopyMessage}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-white/15 bg-[#09090D] hover:border-white/30 text-white text-sm font-medium transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#8B35FF]" aria-hidden="true" />
                <span>Mensagem copiada</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" aria-hidden="true" />
                <span>Copiar mensagem</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setPreparedSubmission(null)}
            className="inline-flex items-center justify-center px-4 py-3 rounded-lg text-sm font-medium text-[#A5A5B0] hover:text-white transition-colors"
          >
            Editar informações
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-xl border border-white/10 bg-[#17171F] p-6 sm:p-8 space-y-5"
    >
      <div className="space-y-1.5">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
          Solicitar agendamento
        </h2>
        <p className="text-sm text-[#A5A5B0]">
          Preencha os dados abaixo para gerar sua solicitação organizada e enviá-la pelo WhatsApp.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label htmlFor="booking-name" className="block text-sm font-medium text-white">
            Nome *
          </label>
          <input
            id="booking-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Seu nome completo"
            value={formData.name}
            onChange={(e) => handleFieldChange('name', e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'booking-name-error' : undefined}
            className="w-full min-h-[44px] rounded-lg bg-[#09090D] border border-white/15 px-4 py-2.5 text-sm text-white placeholder:text-[#A5A5B0]/60 focus:border-[#8B35FF] focus:outline-none transition-colors"
          />
          {errors.name && (
            <p id="booking-name-error" className="text-xs text-rose-400">
              {errors.name}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="booking-phone" className="block text-sm font-medium text-white">
            Telefone / WhatsApp *
          </label>
          <input
            id="booking-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(12) 99999-9999"
            value={formData.phone}
            onChange={(e) => handleFieldChange('phone', e.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'booking-phone-error' : undefined}
            className="w-full min-h-[44px] rounded-lg bg-[#09090D] border border-white/15 px-4 py-2.5 text-sm text-white placeholder:text-[#A5A5B0]/60 focus:border-[#8B35FF] focus:outline-none transition-colors tabular-nums"
          />
          {errors.phone && (
            <p id="booking-phone-error" className="text-xs text-rose-400">
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label htmlFor="booking-vehicle" className="block text-sm font-medium text-white">
            Modelo do veículo *
          </label>
          <input
            id="booking-vehicle"
            name="vehicleModel"
            type="text"
            placeholder="Ex.: Gol 2019, Onix, Hilux"
            value={formData.vehicleModel}
            onChange={(e) => handleFieldChange('vehicleModel', e.target.value)}
            aria-invalid={Boolean(errors.vehicleModel)}
            aria-describedby={errors.vehicleModel ? 'booking-vehicle-error' : undefined}
            className="w-full min-h-[44px] rounded-lg bg-[#09090D] border border-white/15 px-4 py-2.5 text-sm text-white placeholder:text-[#A5A5B0]/60 focus:border-[#8B35FF] focus:outline-none transition-colors"
          />
          {errors.vehicleModel && (
            <p id="booking-vehicle-error" className="text-xs text-rose-400">
              {errors.vehicleModel}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="booking-service" className="block text-sm font-medium text-white">
            Serviço desejado *
          </label>
          <select
            id="booking-service"
            name="service"
            value={formData.service}
            onChange={(e) => handleFieldChange('service', e.target.value)}
            aria-invalid={Boolean(errors.service)}
            aria-describedby={errors.service ? 'booking-service-error' : undefined}
            className="w-full min-h-[44px] rounded-lg bg-[#09090D] border border-white/15 px-4 py-2.5 text-sm text-white focus:border-[#8B35FF] focus:outline-none transition-colors"
          >
            {SERVICES_LIST.map((service) => (
              <option key={service.id} value={service.name} className="bg-[#17171F] text-white">
                {service.name}
              </option>
            ))}
            <option value="Mecânica geral e Rádio automotivo" className="bg-[#17171F] text-white">
              Mecânica geral e Rádio automotivo
            </option>
          </select>
          {errors.service && (
            <p id="booking-service-error" className="text-xs text-rose-400">
              {errors.service}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label htmlFor="booking-date" className="block text-sm font-medium text-white">
            Data desejada *
          </label>
          <input
            id="booking-date"
            name="preferredDate"
            type="date"
            min={todayIso}
            value={formData.preferredDate}
            onChange={(e) => handleFieldChange('preferredDate', e.target.value)}
            aria-invalid={Boolean(errors.preferredDate)}
            aria-describedby={errors.preferredDate ? 'booking-date-error' : undefined}
            className="w-full min-h-[44px] rounded-lg bg-[#09090D] border border-white/15 px-4 py-2.5 text-sm text-white focus:border-[#8B35FF] focus:outline-none transition-colors tabular-nums [color-scheme:dark]"
          />
          {errors.preferredDate && (
            <p id="booking-date-error" className="text-xs text-rose-400">
              {errors.preferredDate}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="booking-time" className="block text-sm font-medium text-white">
            Horário desejado *
          </label>
          <select
            id="booking-time"
            name="preferredTime"
            value={formData.preferredTime}
            onChange={(e) => handleFieldChange('preferredTime', e.target.value)}
            aria-invalid={Boolean(errors.preferredTime)}
            aria-describedby={errors.preferredTime ? 'booking-time-error' : undefined}
            className="w-full min-h-[44px] rounded-lg bg-[#09090D] border border-white/15 px-4 py-2.5 text-sm text-white focus:border-[#8B35FF] focus:outline-none transition-colors tabular-nums"
          >
            <option value="" className="bg-[#17171F] text-[#A5A5B0]">
              Selecione um horário
            </option>
            {TIME_SLOTS.map((slot) => (
              <option key={slot} value={slot} className="bg-[#17171F] text-white">
                {slot}
              </option>
            ))}
          </select>
          {errors.preferredTime && (
            <p id="booking-time-error" className="text-xs text-rose-400">
              {errors.preferredTime}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="booking-description" className="block text-sm font-medium text-white">
          Descrição do problema ou solicitação *
        </label>
        <textarea
          id="booking-description"
          name="description"
          rows={4}
          placeholder="Descreva brevemente o que você observou no veículo ou o atendimento desejado."
          value={formData.description}
          onChange={(e) => handleFieldChange('description', e.target.value)}
          aria-invalid={Boolean(errors.description)}
          aria-describedby={errors.description ? 'booking-description-error' : undefined}
          className="w-full rounded-lg bg-[#09090D] border border-white/15 px-4 py-3 text-sm text-white placeholder:text-[#A5A5B0]/60 focus:border-[#8B35FF] focus:outline-none transition-colors resize-y"
        />
        {errors.description && (
          <p id="booking-description-error" className="text-xs text-rose-400">
            {errors.description}
          </p>
        )}
      </div>

      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-xs text-[#A5A5B0] max-w-sm leading-relaxed">
          O envio gera uma solicitação via WhatsApp. A data e o horário ficam sujeitos à confirmação
          da equipe da Oficina Do Som.
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2.5 min-h-[46px] px-6 py-3 rounded-lg bg-[#8B35FF] hover:bg-[#6424C7] disabled:opacity-60 text-white font-semibold text-sm transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
              <span>Preparando solicitação...</span>
            </>
          ) : (
            <>
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              <span>Solicitar pelo WhatsApp</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
