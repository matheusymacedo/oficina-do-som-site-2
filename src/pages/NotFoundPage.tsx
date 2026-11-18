import { ArrowLeft, Wrench } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
}

export function NotFoundPage({ onNavigate }: NotFoundPageProps) {
  return (
    <section
      aria-labelledby="not-found-title"
      className="pt-32 pb-24 lg:pt-40 lg:pb-32 min-h-[75vh] flex items-center"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-xl rounded-2xl border border-white/10 bg-[#17171F] p-8 sm:p-10 space-y-6">
          <div className="inline-flex items-center gap-3 text-xs font-mono text-[#8B35FF] tabular-nums">
            <Wrench className="w-4 h-4" aria-hidden="true" />
            <span>Erro 404 · Página não encontrada</span>
          </div>

          <h1
            id="not-found-title"
            className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white"
          >
            ESTA ROTA NÃO FOI ENCONTRADA.
          </h1>

          <p className="text-base text-[#A5A5B0] leading-relaxed">
            O endereço acessado pode ter sido alterado ou não existe. Utilize os atalhos abaixo para
            retornar à página inicial ou falar com a Oficina Do Som.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/');
              }}
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-lg bg-[#8B35FF] hover:bg-[#6424C7] text-white text-sm font-semibold transition-colors whitespace-nowrap"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>Voltar ao início</span>
            </a>

            <a
              href="/contato"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/contato');
              }}
              className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-lg border border-white/15 bg-[#09090D] hover:border-white/30 text-white text-sm font-medium transition-colors whitespace-nowrap"
            >
              Ir para contato
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
