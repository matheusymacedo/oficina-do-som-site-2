import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { APP_ROUTES, type PageRouteId } from '../utils/routes';
import { BrandLogo } from './BrandLogo';
import { ScrollProgressBar } from './MotionPrimitives';

interface HeaderProps {
  activeRoute: PageRouteId;
  onNavigate: (path: string) => void;
}

export function Header({ activeRoute, onNavigate }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    event.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(path);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-colors duration-200 ${
        isScrolled || mobileMenuOpen
          ? 'bg-[#09090D]/95 backdrop-blur-md border-b border-white/10'
          : 'bg-[#09090D]/80 backdrop-blur-sm border-b border-white/5'
      }`}
    >
      <ScrollProgressBar />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-[72px] flex items-center justify-between gap-4 lg:gap-8">
        <a
          href="/"
          onClick={(e) => handleLinkClick(e, '/')}
          aria-label="Oficina Do Som - Ir para a página inicial"
          className="inline-flex items-center whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8B35FF] rounded"
        >
          <BrandLogo size="sm" />
        </a>

        <nav
          aria-label="Navegação principal"
          className="hidden lg:flex items-center gap-6 xl:gap-7 text-sm font-medium"
        >
          {APP_ROUTES.map((route) => {
            const isActive = activeRoute === route.id;
            return (
              <a
                key={route.id}
                href={route.path}
                onClick={(e) => handleLinkClick(e, route.path)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8B35FF] rounded ${
                  isActive ? 'text-white' : 'text-[#A5A5B0] hover:text-white'
                }`}
              >
                {route.navLabel}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 -bottom-0.5 h-[2px] bg-[#8B35FF] transition-transform duration-200 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href="/contato"
            onClick={(e) => handleLinkClick(e, '/contato')}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-[#8B35FF] hover:bg-[#6424C7] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Agendar atendimento
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-white/10 bg-[#17171F] text-white hover:border-[#8B35FF]/60 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B35FF]"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav
          id="mobile-navigation-drawer"
          aria-label="Menu móvel"
          className="lg:hidden border-t border-white/10 bg-[#09090D] px-4 py-4 space-y-1"
        >
          {APP_ROUTES.map((route) => {
            const isActive = activeRoute === route.id;
            return (
              <a
                key={route.id}
                href={route.path}
                onClick={(e) => handleLinkClick(e, route.path)}
                aria-current={isActive ? 'page' : undefined}
                className={`flex items-center min-h-[44px] px-3 rounded-lg text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-[#17171F] text-white border border-[#8B35FF]/40'
                    : 'text-[#A5A5B0] hover:text-white hover:bg-[#17171F]/70'
                }`}
              >
                {route.navLabel}
              </a>
            );
          })}
          <div className="pt-3">
            <a
              href="/contato"
              onClick={(e) => handleLinkClick(e, '/contato')}
              className="flex items-center justify-center min-h-[44px] w-full px-5 py-2.5 text-sm font-semibold text-white bg-[#8B35FF] hover:bg-[#6424C7] rounded-lg transition-colors"
            >
              Agendar atendimento
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
