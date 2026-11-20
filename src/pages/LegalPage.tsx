import { ArrowLeft, Mail, Scale, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SafeExternalLink } from '../components/ui/SafeExternalLink';
import { LEGAL_OPERATOR } from '../data/legal';
import { useLanguage } from '../i18n/LanguageContext';

export interface LegalPageProps {
  variant: 'impressum' | 'datenschutz';
}

export function LegalPage({ variant }: LegalPageProps) {
  const { locale, t } = useLanguage();
  const isImpressum = variant === 'impressum';
  const isGerman = locale === 'de';
  const copy = isImpressum ? t.legal.impressum : t.legal.privacy;
  const country = isGerman ? LEGAL_OPERATOR.countryDe : LEGAL_OPERATOR.countryEn;
  const entityNote = isGerman ? LEGAL_OPERATOR.legalEntityNoteDe : LEGAL_OPERATOR.legalEntityNoteEn;

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#C4B5FD]">{copy.eyebrow}</p>
      <h1 className="mt-3 text-3xl font-bold text-[#F5F5FA] sm:text-4xl">{copy.title}</h1>
      <p className="mt-4 text-base leading-relaxed text-[#B4B4CC]">{copy.intro}</p>

      {isImpressum ? (
        <div className="mt-8 space-y-6">
          <article className="i3-card rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-2.5 text-[#C4B5FD]">
              <Scale className="h-5 w-5" aria-hidden="true" />
              <h2 className="text-lg font-bold text-[#F5F5FA]">
                {isGerman ? 'Angaben gemäß § 5 DDG' : 'Provider information under § 5 DDG'}
              </h2>
            </div>
            <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="font-mono text-xs uppercase tracking-wider text-[#B4B4CC]">
                  {isGerman ? 'Website' : 'Website'}
                </dt>
                <dd className="mt-1 font-semibold">
                  <span className="ithreelab-text">iThreeLab.com</span>
                </dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-wider text-[#B4B4CC]">
                  {isGerman ? 'Diensteanbieter' : 'Service provider'}
                </dt>
                <dd className="mt-1 font-semibold text-[#F5F5FA]">{LEGAL_OPERATOR.operatorName}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="font-mono text-xs uppercase tracking-wider text-[#B4B4CC]">
                  {isGerman ? 'Rechtsstatus' : 'Legal status'}
                </dt>
                <dd className="mt-1 text-[#F5F5FA]">{entityNote}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-wider text-[#B4B4CC]">
                  {isGerman ? 'Anschrift' : 'Address'}
                </dt>
                <dd className="mt-1 text-[#F5F5FA]">
                  <address className="not-italic leading-relaxed">
                    {LEGAL_OPERATOR.operatorName}
                    <br />
                    {LEGAL_OPERATOR.street}
                    <br />
                    {LEGAL_OPERATOR.postalCity}
                    <br />
                    {country}
                  </address>
                </dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-wider text-[#B4B4CC]">
                  {isGerman ? 'Kontakt' : 'Contact'}
                </dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${LEGAL_OPERATOR.email}`}
                    className="inline-flex items-center gap-1.5 font-semibold text-[#C4B5FD] hover:underline"
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    <span>{LEGAL_OPERATOR.email}</span>
                  </a>
                </dd>
              </div>
            </dl>
          </article>

          <article className="i3-card rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg font-bold text-[#F5F5FA]">
              {isGerman ? 'Verantwortlich für den Inhalt (§ 18 Abs. 2 MStV)' : 'Editorial responsibility (§ 18 (2) MStV)'}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#B4B4CC]">
              {LEGAL_OPERATOR.operatorName}, {LEGAL_OPERATOR.street}, {LEGAL_OPERATOR.postalCity}, {country}.
            </p>
          </article>

          <article className="i3-card rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg font-bold text-[#F5F5FA]">
              {isGerman ? 'Was diese Website ist' : 'What this website is'}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#B4B4CC]">
              {isGerman
                ? 'iThreeLab.com ist die statische Dachmarken-Website. Sie stellt die Bereiche vor und betreibt hier keine Mitgliederkonten, keine Zahlungen und keinen Schreibzugriff auf Ledger oder Balances.'
                : 'iThreeLab.com is the static umbrella-brand website. It presents the areas and does not run member accounts, payments, or write access to ledgers or balances on this site.'}
            </p>
            <ul className="mt-4 space-y-2 text-sm text-[#B4B4CC]">
              <li>
                <span className="i3lackout-text">I3LACKOUT</span>
                {' · '}
                <SafeExternalLink url="https://i3lackout.com" label="i3lackout.com" className="text-[#C4B5FD] hover:underline" />
              </li>
              <li>
                <span className="text-[#FCD34D]">musicchaini3</span>
                {' · '}
                <SafeExternalLink url="https://musicchaini3.com" label="musicchaini3.com" className="text-[#FCD34D] hover:underline" />
              </li>
              <li>
                <span className="text-[#F59E0B]">i3-economics-intelligence</span>
                {' · '}
                <Link to="/labs/economics" className="text-[#F59E0B] hover:underline">
                  {isGerman ? 'Economics Lab' : 'Economics Lab'}
                </Link>
              </li>
              <li>
                <span className="text-[#F59E0B]">iThree Studio</span>
                {' · '}
                <Link to="/studio" className="text-[#F59E0B] hover:underline">
                  {isGerman ? 'Studio-Seite' : 'Studio page'}
                </Link>
              </li>
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-[#B4B4CC]">
              {isGerman
                ? 'i3lackout.com und musicchaini3.com sind eigene Websites. Deren Angebote und Angaben gelten dort.'
                : 'i3lackout.com and musicchaini3.com are separate websites. Their services and notices apply there.'}
            </p>
          </article>
        </div>
      ) : (
        <div className="mt-8 space-y-6">
          <article className="i3-card rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-2.5 text-[#C4B5FD]">
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              <h2 className="text-lg font-bold text-[#F5F5FA]">
                {isGerman ? '1. Verantwortlicher' : '1. Controller'}
              </h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[#B4B4CC]">
              {LEGAL_OPERATOR.operatorName}
              <br />
              {LEGAL_OPERATOR.street}, {LEGAL_OPERATOR.postalCity}, {country}
              <br />
              <a href={`mailto:${LEGAL_OPERATOR.email}`} className="font-semibold text-[#C4B5FD] hover:underline">
                {LEGAL_OPERATOR.email}
              </a>
            </p>
          </article>

          <article className="i3-card rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg font-bold text-[#F5F5FA]">
              {isGerman ? '2. Aufruf der Website' : '2. Visiting the website'}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#B4B4CC]">
              {isGerman
                ? 'Beim Aufruf verarbeitet der Webserver die technisch nötigen Verbindungsdaten, insbesondere IP-Adresse, Zeitpunkt, aufgerufenen Pfad, Statuscode und User-Agent, um die statischen Seiten auszuliefern. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Diese Website setzt keine Tracking-Cookies, keine Werbe-Tracker und keine Anmelde-Cookies.'
                : 'When you open a page, the web server processes the connection data needed to deliver it, in particular IP address, time, requested path, status code, and user agent. The legal basis is Art. 6 (1) (f) GDPR. This website sets no tracking cookies, no advertising trackers, and no sign-in cookies.'}
            </p>
          </article>

          <article className="i3-card rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg font-bold text-[#F5F5FA]">
              {isGerman ? '3. Sprache im Browser' : '3. Language in the browser'}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#B4B4CC]">
              {isGerman
                ? 'Die gewählte Sprache (Deutsch oder Englisch) wird nur lokal im Browser gespeichert, unter dem Schlüssel ithreelab_locale. Sie wird nicht an einen Server gesendet.'
                : 'The selected language (German or English) is stored only in your browser, under the key ithreelab_locale. It is not sent to a server.'}
            </p>
          </article>

          <article className="i3-card rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg font-bold text-[#F5F5FA]">
              {isGerman ? '4. Economics Lab' : '4. Economics Lab'}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#B4B4CC]">
              {isGerman
                ? 'Wenn du im Economics Lab eine Server-Berechnung startest, sendet der Browser die von dir eingegebenen synthetischen Werte an die Same-Origin-Adresse /api/economics-lab. Es werden keine Mitgliederkonten, Balances oder Ledger übertragen. Ist die API nicht erreichbar, bleibt die Berechnung im Browser. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.'
                : 'If you start a server calculation in the Economics Lab, the browser sends the synthetic values you entered to the same-origin address /api/economics-lab. No member accounts, balances, or ledgers are transmitted. If the API is unavailable, the calculation stays in the browser. The legal basis is Art. 6 (1) (f) GDPR.'}
            </p>
          </article>

          <article className="i3-card rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg font-bold text-[#F5F5FA]">
              {isGerman ? '5. Externe Websites und E-Mail' : '5. External websites and email'}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#B4B4CC]">
              {isGerman
                ? 'Links zu i3lackout.com und musicchaini3.com verlassen diese Website. Deren eigene Hinweise gelten dort. Eine E-Mail an die oben genannte Adresse wird nur zur Bearbeitung der Anfrage verwendet.'
                : 'Links to i3lackout.com and musicchaini3.com leave this website. Their own notices apply there. Email sent to the address above is used only to handle that request.'}
            </p>
          </article>

          <article className="i3-card rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg font-bold text-[#F5F5FA]">
              {isGerman ? '6. Rechte' : '6. Your rights'}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#B4B4CC]">
              {isGerman
                ? 'Du hast im gesetzlichen Rahmen das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch sowie das Recht auf Beschwerde bei einer Datenschutz-Aufsichtsbehörde (Art. 15 bis 21 und 77 DSGVO).'
                : 'Within the statutory limits you have the right of access, rectification, erasure, restriction, data portability, and objection, and the right to lodge a complaint with a supervisory authority (Art. 15 to 21 and 77 GDPR).'}
            </p>
          </article>
        </div>
      )}

      <div className="mt-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[#C4B5FD] hover:underline">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>
            {t.legal.backTo}
            <span className="ithreelab-text">iThreeLab</span>
          </span>
        </Link>
      </div>
    </section>
  );
}
