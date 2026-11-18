export interface SocialLinkConfig {
  label: string;
  url: string;
}

export interface BusinessHourConfig {
  days: string;
  hours: string;
}

export interface CompanyConfig {
  name: string;
  segment: string;
  experienceBadge: string;
  city: string;
  state: string;
  country: string;
  /**
   * Para utilizar o logotipo original da empresa, adicione a imagem em /public/logo-original.png
   * e informe o caminho aqui (ex.: '/logo-original.png'). Enquanto for null, será exibido o
   * símbolo modernizado da Oficina Do Som.
   */
  logoUrl: string | null;
  contact: {
    whatsappNumber: string;
    whatsappDisplay: string;
    whatsappBaseUrl: string;
    email: string;
  };
  location: {
    streetAddress: string | null;
    neighborhood: string | null;
    postalCode: string | null;
    coordinates: {
      lat: number;
      lng: number;
    };
    googleMapsSearchUrl: string;
    googleMapsEmbedUrl: string | null;
    isExactAddressConfigured: boolean;
  };
  /** Preencha com os horários reais de funcionamento quando desejar exibi-los no site. */
  businessHours: BusinessHourConfig[];
  /** Preencha com links reais das redes sociais da Oficina Do Som, quando disponíveis. */
  socialLinks: SocialLinkConfig[];
}

export const COMPANY_CONFIG: CompanyConfig = {
  name: 'Oficina Do Som',
  segment: 'Oficina automotiva',
  experienceBadge: 'Mais de 10 anos no mercado',
  city: 'Cruzeiro',
  state: 'SP',
  country: 'Brasil',
  logoUrl: null,
  contact: {
    whatsappNumber: '5512988446622',
    whatsappDisplay: '+55 12 98844-6622',
    whatsappBaseUrl: 'https://wa.me/5512988446622',
    email: 'oficinadosomcruzeirosp@gmail.com',
  },
  location: {
    streetAddress: 'R. Amador da Costa e Souza, 130',
    neighborhood: null,
    postalCode: null,
    coordinates: {
      lat: -22.5764,
      lng: -44.9628,
    },
    googleMapsSearchUrl:
      'https://www.google.com/maps/search/?api=1&query=R.+Amador+da+Costa+e+Souza,+130,+Cruzeiro+-+SP',
    googleMapsEmbedUrl: null,
    isExactAddressConfigured: true,
  },
  businessHours: [],
  socialLinks: [],
};

export const HERO_MEDIA = {
  aboutBayImage: '/src/assets/images/about_oficina_bay_1795041543753.jpg',
  aboutBayAlt:
    'Box técnico automotivo representando o ambiente de atendimento mecânico.',
};
