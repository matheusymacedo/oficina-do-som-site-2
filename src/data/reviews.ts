export interface ClientReview {
  id: string;
  authorName: string;
  vehicleLabel?: string;
  rating: number;
  dateLabel: string;
  comment: string;
}

/**
 * Estrutura preparada para receber exclusivamente avaliações reais de clientes da Oficina Do Som.
 * Nenhum depoimento ou nota fictícia é cadastrado por padrão.
 *
 * Exemplo de uso quando avaliações reais forem fornecidas:
 * {
 *   id: 'avaliacao-01',
 *   authorName: 'Nome real do cliente',
 *   vehicleLabel: 'Modelo do veículo (opcional)',
 *   rating: 5,
 *   dateLabel: 'Mês/Ano',
 *   comment: 'Texto real do depoimento autorizado pelo cliente.'
 * }
 */
export const CLIENT_REVIEWS: ClientReview[] = [];
