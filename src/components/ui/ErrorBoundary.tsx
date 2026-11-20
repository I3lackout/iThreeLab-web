import { Component, type ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface ErrorBoundaryProps {
  children: ReactNode;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

// eslint-disable-next-line react-refresh/only-export-components
function ErrorBoundaryFallback({ onReset }: { onReset: () => void }) {
  const { t } = useLanguage();

  return (
    <section
      role="alert"
      className="mx-auto my-16 max-w-2xl rounded-2xl border border-[#F59E0B]/40 bg-[#151520] p-8 text-[#F5F5FA]"
    >
      <div className="flex items-center gap-3 text-[#F59E0B]">
        <AlertTriangle className="h-5 w-5" aria-hidden="true" />
        <p className="font-mono text-xs uppercase tracking-[0.2em]">{t.errorBoundary.eyebrow}</p>
      </div>
      <h1 className="mt-4 text-2xl font-bold">{t.errorBoundary.title}</h1>
      <p className="mt-3 text-sm leading-relaxed text-[#B4B4CC]">
        {t.errorBoundary.description}
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 rounded-lg border border-[#00E5FF]/50 bg-[#08090D] px-4 py-2 text-sm font-semibold text-[#F5F5FA] hover:border-[#00E5FF]"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          <span>{t.errorBoundary.reload}</span>
        </button>
        <a
          href="/"
          className="inline-flex items-center rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-[#B4B4CC] hover:text-[#F5F5FA]"
        >
          {t.errorBoundary.backPrefix}
          <span className="ithreelab-text">iThreeLab</span>
          {t.errorBoundary.backSuffix}
        </a>
      </div>
    </section>
  );
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch() {
    // Deliberately avoid leaking internal stack traces into production logs or UI.
  }

  private handleReset = () => {
    this.setState({ hasError: false });
    this.props.onReset?.();
  };

  render() {
    if (this.state.hasError) {
      return <ErrorBoundaryFallback onReset={this.handleReset} />;
    }

    return this.props.children;
  }
}
