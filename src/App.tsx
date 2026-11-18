import { useCallback, useEffect, useState } from 'react';
import { getPageSeo, matchRoute, normalizePathname, type PageRouteId } from './utils/routes';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { usePrefersReducedMotion } from './components/MotionPrimitives';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ServicesPage } from './pages/ServicesPage';

function updateSeoTags(routeId: PageRouteId) {
  const { title, description } = getPageSeo(routeId);
  document.title = title;

  const setMetaContent = (selector: string, content: string) => {
    const el = document.querySelector<HTMLMetaElement>(selector);
    if (el) {
      el.setAttribute('content', content);
    }
  };

  setMetaContent('meta[name="description"]', description);
  setMetaContent('meta[property="og:title"]', title);
  setMetaContent('meta[property="og:description"]', description);
  setMetaContent('meta[name="twitter:title"]', title);
  setMetaContent('meta[name="twitter:description"]', description);
}

export default function App() {
  const shouldReduceMotion = usePrefersReducedMotion();
  const [currentPath, setCurrentPath] = useState<string>(() =>
    normalizePathname(window.location.pathname),
  );

  const activeRoute = matchRoute(currentPath);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(normalizePathname(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    updateSeoTags(activeRoute);
  }, [activeRoute]);

  const navigate = useCallback(
    (targetPath: string) => {
      const normalized = normalizePathname(targetPath);
      if (normalized !== currentPath) {
        window.history.pushState({}, '', normalized);
        setCurrentPath(normalized);
      }
      window.scrollTo({
        top: 0,
        behavior: shouldReduceMotion ? 'auto' : 'smooth',
      });
    },
    [currentPath, shouldReduceMotion],
  );

  const renderPage = () => {
    switch (activeRoute) {
      case 'home':
        return <HomePage onNavigate={navigate} />;
      case 'services':
        return <ServicesPage onNavigate={navigate} />;
      case 'about':
        return <AboutPage onNavigate={navigate} />;
      case 'faq':
        return <FaqPage onNavigate={navigate} />;
      case 'contact':
        return <ContactPage />;
      case 'not-found':
      default:
        return <NotFoundPage onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#09090D] text-white">
      <Header activeRoute={activeRoute} onNavigate={navigate} />

      <main id="main-content" className="flex-1">
        <div key={activeRoute} className="animate-page-enter">
          {renderPage()}
        </div>
      </main>

      <Footer onNavigate={navigate} />
      <FloatingWhatsApp />
    </div>
  );
}
