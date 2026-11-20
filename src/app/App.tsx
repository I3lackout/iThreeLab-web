import { LazyMotion, MotionConfig, domAnimation } from 'motion/react';
import { Footer } from '../components/layout/Footer';
import { Navbar } from '../components/layout/Navbar';
import { ErrorBoundary } from '../components/ui/ErrorBoundary';
import { LanguageProvider } from '../i18n/LanguageContext';
import type { Locale } from '../i18n/translations';
import { AppRoutes } from './routes';

interface AppProps {
  initialLocale?: Locale;
}

export function App({ initialLocale }: AppProps = {}) {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <LanguageProvider initialLocale={initialLocale}>
          <div className="flex min-h-screen flex-col bg-[#08090D] text-[#F5F5FA]">
            <Navbar />
            <main id="main-content" className="flex-1">
              <ErrorBoundary>
                <AppRoutes />
              </ErrorBoundary>
            </main>
            <Footer />
          </div>
        </LanguageProvider>
      </MotionConfig>
    </LazyMotion>
  );
}

export default App;
