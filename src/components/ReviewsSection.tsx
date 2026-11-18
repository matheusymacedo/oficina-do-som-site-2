import { ArrowUpRight, Star } from 'lucide-react';
import { CLIENT_REVIEWS } from '../data/reviews';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import { RevealSection } from './MotionPrimitives';

export function ReviewsSection() {
  const feedbackMessage =
    'Olá, pessoal da Oficina Do Som! Gostaria de deixar minha avaliação sobre o atendimento que tive com vocês.';

  return (
    <section
      aria-labelledby="reviews-section-title"
      className="py-16 lg:py-20 border-t border-white/10"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {CLIENT_REVIEWS.length === 0 ? (
          <RevealSection className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-2.5">
              <p className="text-sm font-medium text-[#A5A5B0]">Avaliações de clientes</p>
              <h2
                id="reviews-section-title"
                className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-white text-balance"
              >
                Já trouxe seu carro aqui? Conte como foi.
              </h2>
              <p className="text-sm sm:text-base text-[#A5A5B0] leading-relaxed max-w-2xl">
                Publicamos aqui apenas depoimentos reais de clientes atendidos na oficina. Se você
                já passou pela Oficina Do Som, envie sua opinião pelo WhatsApp.
              </p>
            </div>
            <div className="lg:col-span-5 flex lg:justify-end">
              <a
                href={buildWhatsAppUrl(feedbackMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 min-h-[46px] px-5 py-2.5 rounded-lg border border-white/15 bg-[#17171F] hover:border-[#8B35FF] text-sm font-semibold text-white transition-colors whitespace-nowrap"
              >
                <span>Enviar avaliação no WhatsApp</span>
                <ArrowUpRight
                  className="w-4 h-4 text-[#A5A5B0] group-hover:text-white transition-colors"
                  aria-hidden="true"
                />
              </a>
            </div>
          </RevealSection>
        ) : (
          <div className="space-y-8">
            <RevealSection className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <p className="text-sm font-medium text-[#A5A5B0]">Avaliações de clientes</p>
                <h2
                  id="reviews-section-title"
                  className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-white"
                >
                  O que dizem os nossos clientes
                </h2>
              </div>
              <a
                href={buildWhatsAppUrl(feedbackMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg border border-white/15 bg-[#17171F] hover:border-[#8B35FF] text-sm font-medium text-white transition-colors whitespace-nowrap shrink-0"
              >
                Enviar avaliação
              </a>
            </RevealSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CLIENT_REVIEWS.map((review, idx) => (
                <RevealSection key={review.id} delay={idx * 0.06}>
                  <article className="h-full rounded-xl border border-white/10 bg-[#17171F] p-6 flex flex-col justify-between gap-5">
                    <div className="space-y-4">
                      <div
                        className="flex items-center gap-1"
                        aria-label={`Nota ${review.rating} de 5`}
                      >
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star
                            key={index}
                            className={`w-4 h-4 ${
                              index < review.rating
                                ? 'text-[#8B35FF] fill-[#8B35FF]'
                                : 'text-white/15'
                            }`}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <p className="text-sm text-white/90 leading-relaxed">“{review.comment}”</p>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2 text-xs text-[#A5A5B0]">
                      <span className="font-semibold text-white">{review.authorName}</span>
                      <span>
                        {[review.vehicleLabel, review.dateLabel].filter(Boolean).join(' · ')}
                      </span>
                    </div>
                  </article>
                </RevealSection>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
