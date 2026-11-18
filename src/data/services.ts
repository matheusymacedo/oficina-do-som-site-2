export type ServiceIconKey = 'wrench' | 'radio';

export interface ServiceItem {
  id: string;
  orderNumber: string;
  name: string;
  shortDescription: string;
  detailedDescription: string;
  highlights: string[];
  image: string;
  imageAlt: string;
  icon: ServiceIconKey;
  whatsappTopic: string;
}

/**
 * Estrutura extensível de serviços da Oficina Do Som.
 * Para adicionar novos serviços no futuro, basta incluir um novo objeto neste array.
 */
export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'mecanica-geral',
    orderNumber: '01',
    name: 'Mecânica geral',
    shortDescription:
      'Atendimento em mecânica geral para veículos de diferentes categorias, com atenção técnica e cuidado em cada etapa.',
    detailedDescription:
      'Oferecemos atendimento em mecânica geral em Cruzeiro - SP para proprietários de veículos de diferentes categorias. Nossa equipe atua com dedicação, transparência na avaliação e compromisso com a qualidade do serviço realizado.',
    highlights: [
      'Avaliação direta e atendimento próximo ao cliente',
      'Atuação voltada a diferentes categorias de veículos',
      'Mais de 10 anos de experiência prática no mercado automotivo',
    ],
    image: '/src/assets/images/service_mecanica_geral_1795041542085.jpg',
    imageAlt:
      'Atendimento técnico de mecânica geral em veículo na Oficina Do Som em Cruzeiro - SP.',
    icon: 'wrench',
    whatsappTopic: 'Mecânica geral',
  },
  {
    id: 'radio-automotivo',
    orderNumber: '02',
    name: 'Rádio automotivo',
    shortDescription:
      'Serviços relacionados a rádio automotivo com acabamento cuidadoso e integração ao painel do seu veículo.',
    detailedDescription:
      'Realizamos serviços relacionados a rádio automotivo em Cruzeiro - SP, cuidando da funcionalidade e da integração ao interior do veículo. Entre em contato pelo WhatsApp para conversar diretamente sobre a necessidade do seu carro.',
    highlights: [
      'Atendimento dedicado a sistemas de rádio automotivo',
      'Cuidado com acabamento e organização no painel',
      'Orçamento alinhado diretamente com a nossa equipe',
    ],
    image: '/src/assets/images/service_radio_automotivo_1795041542493.jpg',
    imageAlt:
      'Painel automotivo com sistema de rádio integrado e acabamento refinado.',
    icon: 'radio',
    whatsappTopic: 'Rádio automotivo',
  },
];
