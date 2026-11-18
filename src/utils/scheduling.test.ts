import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatAppointmentMessage,
  formatBrazilianPhone,
  validateAppointmentForm,
  type AppointmentFormData,
} from './scheduling';
import { buildWhatsAppUrl, formatServiceInquiryMessage } from './whatsapp';

test('formatBrazilianPhone formats 10-digit and 11-digit numbers cleanly', () => {
  assert.equal(formatBrazilianPhone('12988446622'), '(12) 98844-6622');
  assert.equal(formatBrazilianPhone('1231441234'), '(12) 3144-1234');
  assert.equal(formatBrazilianPhone('12'), '(12');
});

test('validateAppointmentForm flags missing or invalid fields', () => {
  const empty: AppointmentFormData = {
    name: '',
    phone: '123',
    vehicleModel: '',
    service: '',
    preferredDate: '2026-11-10',
    preferredTime: '',
    description: 'oi',
  };

  const errors = validateAppointmentForm(empty, '2026-11-18');
  assert.ok(errors.name);
  assert.ok(errors.phone);
  assert.ok(errors.vehicleModel);
  assert.ok(errors.service);
  assert.ok(errors.preferredDate);
  assert.ok(errors.preferredTime);
  assert.ok(errors.description);
});

test('validateAppointmentForm passes for complete valid submission', () => {
  const valid: AppointmentFormData = {
    name: 'Carlos Eduardo Silva',
    phone: '(12) 98844-6622',
    vehicleModel: 'Honda Civic 2020',
    service: 'Mecânica geral',
    preferredDate: '2026-11-25',
    preferredTime: '09:30',
    description: 'Revisão preventiva antes de viagem.',
  };

  const errors = validateAppointmentForm(valid, '2026-11-18');
  assert.deepEqual(errors, {});
});

test('formatAppointmentMessage formats readable WhatsApp booking text without claiming confirmation', () => {
  const valid: AppointmentFormData = {
    name: 'Mariana Souza',
    phone: '(12) 99123-4567',
    vehicleModel: 'Volkswagen Polo 2022',
    service: 'Rádio automotivo',
    preferredDate: '2026-12-02',
    preferredTime: '14:00',
    description: 'Verificação do rádio automotivo no painel.',
  };

  const msg = formatAppointmentMessage(valid);
  assert.match(msg, /Nome: Mariana Souza/);
  assert.match(msg, /Veículo: Volkswagen Polo 2022/);
  assert.match(msg, /Serviço desejado: Rádio automotivo/);
  assert.match(msg, /Data desejada: 02\/12\/2026/);
  assert.match(msg, /Aguardo a confirmação de disponibilidade pela equipe/);
});

test('buildWhatsAppUrl generates properly encoded wa.me URL for +55 12 98844-6622', () => {
  const url = buildWhatsAppUrl(formatServiceInquiryMessage('Mecânica geral'));
  assert.ok(url.startsWith('https://wa.me/5512988446622?text='));
  assert.ok(decodeURIComponent(url).includes('Mecânica geral'));
});
