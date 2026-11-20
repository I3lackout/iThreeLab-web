import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';
import { SafeExternalLink } from '../ui/SafeExternalLink';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-white/10 bg-[#08090D] py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-sm">
          <p className="text-sm font-bold tracking-[0.2em] text-[#8B5CF6]">
            iThreeLab · iThreeLab.com
          </p>
          <p className="mt-2 text-xs leading-relaxed text-[#B4B4CC]">
            {t.footer.descriptionPrefix}
            <span className="i3lackout-text">I3LACKOUT</span>
            {t.footer.descriptionAfterI3lackout}
            <span className="text-[#FCD34D]">musicchaini3</span>
            {t.footer.descriptionAfterMusicchain}
            <span className="text-[#F59E0B]">i3-economics-intelligence</span>
            {t.footer.descriptionAfterEconomics}
            <span className="text-[#F59E0B]">iThree Studio</span>
            {t.footer.descriptionBeforeDomain}
            <span className="ithreelab-text">iThreeLab.com</span>
            {t.footer.descriptionSuffix}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#C4B5FD]">
              {t.footer.navigationHeading}
            </p>
            <ul className="mt-3 flex flex-col gap-2 text-sm text-[#B4B4CC]">
              <li>
                <Link to="/" className="hover:text-[#F5F5FA]">
                  <span className="ithreelab-text">iThreeLab</span>
                  {t.footer.portalSuffix}
                </Link>
              </li>
              <li>
                <Link to="/ecosystem" className="hover:text-[#F5F5FA]">
                  {t.footer.ecosystem}
                </Link>
              </li>
              <li>
                <Link to="/technology" className="hover:text-[#F5F5FA]">
                  {t.footer.technology}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#F5F5FA]">
                  {t.footer.visionAbout}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#00E5FF]">
              {t.footer.labsStudioHeading}
            </p>
            <ul className="mt-3 flex flex-col gap-2 text-sm text-[#B4B4CC]">
              <li>
                <Link to="/labs" className="hover:text-[#00E5FF]">
                  {t.footer.labs}
                </Link>
              </li>
              <li>
                <Link to="/labs/intelligence" className="hover:text-[#00E5FF]">
                  {t.footer.intelligenceCore}
                </Link>
              </li>
              <li>
                <Link to="/labs/economics" className="hover:text-[#00E5FF]">
                  {t.footer.economicsLab}
                </Link>
              </li>
              <li>
                <Link to="/studio" className="hover:text-[#F59E0B]">
                  {t.footer.studio}
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#F59E0B]">
              {t.footer.ecosystemLegalHeading}
            </p>
            <ul className="mt-3 flex flex-col gap-2 text-sm text-[#B4B4CC]">
              <li>
                <SafeExternalLink
                  url="https://i3lackout.com"
                  label="i3lackout.com"
                  className="text-[#C4B5FD] hover:text-[#F5F5FA] hover:underline"
                />
              </li>
              <li>
                <SafeExternalLink
                  url="https://musicchaini3.com"
                  label="musicchaini3.com"
                  className="text-[#FCD34D] hover:text-[#F5F5FA] hover:underline"
                />
              </li>
              <li>
                <Link to="/" className="ithreelab-link hover:underline">iThreeLab</Link>
              </li>
              <li className="flex gap-4 pt-1 text-xs">
                <Link to="/impressum" className="hover:text-[#F5F5FA]">
                  {t.footer.impressum}
                </Link>
                <Link to="/datenschutz" className="hover:text-[#F5F5FA]">
                  {t.footer.privacy}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
