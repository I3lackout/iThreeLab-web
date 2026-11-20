import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { SeoManager } from './SeoManager';
import { AboutPage } from '../pages/AboutPage';
import { EconomicsLabPage } from '../pages/EconomicsLabPage';
import { EcosystemPage } from '../pages/EcosystemPage';
import { HomePage } from '../pages/HomePage';
import { IntelligenceCorePage } from '../pages/IntelligenceCorePage';
import { LabsPage } from '../pages/LabsPage';
import { LegalPage } from '../pages/LegalPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { StudioPage } from '../pages/StudioPage';
import { TechnologyPage } from '../pages/TechnologyPage';

function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash && typeof window.scrollTo === 'function') {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

export function AppRoutes() {
  return (
    <>
      <ScrollManager />
      <SeoManager />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ecosystem" element={<EcosystemPage />} />
        <Route path="/labs" element={<LabsPage />} />
        <Route path="/labs/intelligence" element={<IntelligenceCorePage />} />
        <Route path="/labs/economics" element={<EconomicsLabPage />} />
        <Route path="/studio" element={<StudioPage />} />
        <Route path="/technology" element={<TechnologyPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/impressum" element={<LegalPage variant="impressum" />} />
        <Route path="/datenschutz" element={<LegalPage variant="datenschutz" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
