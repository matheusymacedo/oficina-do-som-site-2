export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  featuredOnHome?: boolean;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'servicos-realizados',
    question: 'Quais serviços a Oficina Do Som realiza?',
    answer:
      'Atuamos em mecânica geral e em serviços relacionados a rádio automotivo, atendendo veículos de diferentes categorias em Cruzeiro - SP há mais de 10 anos.',
    featuredOnHome: true,
  },
  {
    id: 'endereco-localizacao',
    question: 'Onde a oficina está localizada?',
    answer:
      'Estamos na R. Amador da Costa e Souza, 130, em Cruzeiro - SP. Você pode conferir o ponto no mapa e abrir a rota direta no Google Maps pela página de Contato ou pelo rodapé do site.',
    featuredOnHome: true,
  },
  {
    id: 'como-funciona-agendamento',
    question: 'Como funciona o agendamento pelo site?',
    answer:
      'Na página Contato, você preenche os dados do veículo, o serviço desejado e uma sugestão de data e horário. O site prepara a mensagem organizada para você enviar direto no nosso WhatsApp (+55 12 98844-6622), e nossa equipe confirma a disponibilidade.',
    featuredOnHome: true,
  },
  {
    id: 'tirar-duvidas-antes',
    question: 'Posso tirar dúvidas pelo WhatsApp antes de levar o carro?',
    answer:
      'Sim. Você pode falar diretamente com nossa equipe pelo WhatsApp (+55 12 98844-6622) ou pelo e-mail oficinadosomcruzeirosp@gmail.com contando o que observou no veículo para receber orientação inicial.',
    featuredOnHome: true,
  },
  {
    id: 'categorias-veiculos',
    question: 'Vocês atendem diferentes tipos e categorias de veículos?',
    answer:
      'Sim. A Oficina Do Som atende proprietários de veículos de diferentes categorias, tanto para demandas de mecânica geral quanto para serviços relacionados ao rádio automotivo.',
  },
  {
    id: 'atendimento-radio-automotivo',
    question: 'Como é o cuidado nos serviços de rádio automotivo?',
    answer:
      'Trabalhamos focando na funcionalidade do equipamento e na boa integração com o painel do carro, mantendo organização e acabamento cuidadoso em cada veículo atendido.',
  },
  {
    id: 'atendimento-proximo',
    question: 'Como funciona o atendimento direto com a equipe?',
    answer:
      'Com mais de 10 anos no mercado, valorizamos o atendimento próximo e personalizado: você conversa diretamente com quem acompanha o serviço do seu veículo, com comunicação clara do início à entrega.',
  },
  {
    id: 'enviar-avaliacao',
    question: 'Como posso enviar minha avaliação após o atendimento?',
    answer:
      'Publicamos no site apenas avaliações reais de clientes que já passaram pela oficina. Se você já trouxe seu veículo à Oficina Do Som, pode enviar sua opinião pelo botão de avaliação via WhatsApp.',
  },
];
