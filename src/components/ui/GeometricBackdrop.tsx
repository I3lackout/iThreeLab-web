export function GeometricBackdrop() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="i3-universe-glow absolute inset-0" />
      <div className="i3-grid-backdrop absolute inset-0 opacity-65" />

      <svg
        viewBox="0 0 1200 640"
        fill="none"
        className="i3-ambient-pulse absolute left-1/2 top-0 h-full w-full max-w-6xl -translate-x-1/2 opacity-55"
      >
        <circle
          cx="600"
          cy="310"
          r="210"
          stroke="rgba(139, 92, 246, 0.22)"
          strokeWidth="1"
          strokeDasharray="6 8"
        />
        <circle
          cx="600"
          cy="310"
          r="142"
          stroke="rgba(0, 229, 255, 0.18)"
          strokeWidth="1"
        />
        <polygon
          points="600,115 775,418 425,418"
          stroke="rgba(245, 245, 250, 0.14)"
          strokeWidth="1"
        />
        <line
          x1="120"
          y1="140"
          x2="425"
          y2="418"
          stroke="rgba(139, 92, 246, 0.16)"
          strokeWidth="1"
        />
        <line
          x1="1080"
          y1="160"
          x2="775"
          y2="418"
          stroke="rgba(0, 229, 255, 0.16)"
          strokeWidth="1"
        />
        <circle cx="600" cy="115" r="5" fill="#8B5CF6" fillOpacity="0.85" />
        <circle cx="775" cy="418" r="5" fill="#00E5FF" fillOpacity="0.85" />
        <circle cx="425" cy="418" r="5" fill="#F59E0B" fillOpacity="0.85" />
      </svg>
    </div>
  );
}
