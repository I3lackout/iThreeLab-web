/** Apply each brand's own color while preserving text and accessible names. */
export function BrandText({ children }: { children: string }) {
  return <>{children.split(/(i3lackout(?:\.com(?:\/developer)?|-web)?|iThreeLab(?:\.com)?)/gi).map((part, index) => {
    const className = /^i3lackout/i.test(part) ? 'i3lackout-text'
      : /^iThreeLab/i.test(part) ? 'ithreelab-text' : null;
    return className ? <span key={index} className={className}>{part}</span> : part;
  })}</>;
}
