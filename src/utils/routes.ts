export type PageRouteId =
  | 'home'
  | 'services'
  | 'about'
  | 'faq'
  | 'contact'
  | 'not-found';

export interface RouteDefinition {
  id: Exclude<PageRouteId, 'not-found'>;
  path: string;
  navLabel: string;
  seoTitle: string;
  seoDescription: string;
}

export const APP_ROUTES: RouteDefinition[] = [
  {
    id: 'home',
    path: '/',
    navLabel: 'Início',
    seoTitle: 'Oficina Do Som — Oficina Automotiva em Cruzeiro SP',
    seoDescription:
      'Mais de 10 anos de experiência em Cruzeiro - SP. Mecânica geral e serviços relacionados a rádio automotivo com atendimento próximo e compromisso com a qualidade.',
  },
  {
    id: 'services',
    path: '/servicos',
    navLabel: 'Serviços',
    seoTitle: 'Serviços — Mecânica Geral e Rádio Automotivo | Oficina Do Som',
    seoDescription:
      'Conheça os serviços da Oficina Do Som em Cruzeiro - SP: mecânica geral e serviços relacionados a rádio automotivo. Solicite seu orçamento pelo WhatsApp.',
  },
  {
    id: 'about',
    path: '/sobre',
    navLabel: 'Sobre nós',
    seoTitle: 'Sobre Nós — Mais de 10 Anos em Cruzeiro SP | Oficina Do Som',
    seoDescription:
      'Conheça a trajetória da Oficina Do Som em Cruzeiro - SP. Mais de 10 anos de dedicação ao setor automotivo e compromisso com cada cliente.',
  },
  {
    id: 'faq',
    path: '/perguntas-frequentes',
    navLabel: 'Perguntas frequentes',
    seoTitle: 'Perguntas Frequentes | Oficina Do Som em Cruzeiro SP',
    seoDescription:
      'Tire suas dúvidas sobre mecânica geral, rádio automotivo, agendamento pelo WhatsApp e localização na R. Amador da Costa e Souza, 130 em Cruzeiro - SP.',
  },
  {
    id: 'contact',
    path: '/contato',
    navLabel: 'Contato',
    seoTitle: 'Contato e Agendamento em Cruzeiro SP | Oficina Do Som',
    seoDescription:
      'Solicite atendimento na Oficina Do Som em Cruzeiro - SP. Agende pelo formulário integrado ao WhatsApp +55 12 98844-6622 ou envie um e-mail.',
  },
];

export function normalizePathname(pathname: string): string {
  if (!pathname) return '/';
  const cleaned = pathname.split('?')[0].split('#')[0];
  if (cleaned.length > 1 && cleaned.endsWith('/')) {
    return cleaned.slice(0, -1);
  }
  return cleaned || '/';
}

export function matchRoute(pathname: string): PageRouteId {
  const normalized = normalizePathname(pathname);
  const found = APP_ROUTES.find((route) => route.path === normalized);
  return found ? found.id : 'not-found';
}

export function getPageSeo(routeId: PageRouteId): { title: string; description: string } {
  const found = APP_ROUTES.find((route) => route.id === routeId);
  if (found) {
    return {
      title: found.seoTitle,
      description: found.seoDescription,
    };
  }
  return {
    title: 'Página não encontrada | Oficina Do Som',
    description:
      'A página acessada não está disponível. Volte para o site oficial da Oficina Do Som em Cruzeiro - SP.',
  };
}
