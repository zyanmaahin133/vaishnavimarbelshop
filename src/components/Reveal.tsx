import { useReveal } from "@/hooks/use-reveal";

/**
 * Scroll-reveal wrapper: fades and lifts its children into view once.
 * `delay` staggers items inside a grid.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, className: reveal } = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`${reveal} ${className}`}>
      {children}
    </div>
  );
}
