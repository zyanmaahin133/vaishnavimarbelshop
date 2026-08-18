import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { formatPrice, groupLabel, type CatalogItem } from "@/data/catalog";

const DURATION = 6200;

export function Carousel({ items, heading }: { items: CatalogItem[]; heading?: string }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const startedAt = useRef(Date.now());
  const count = items.length;

  const go = useCallback(
    (n: number) => {
      setIndex((i) => (i + n + count) % count);
      startedAt.current = Date.now();
      setProgress(0);
    },
    [count],
  );

  const jump = useCallback((i: number) => {
    setIndex(i);
    startedAt.current = Date.now();
    setProgress(0);
  }, []);

  useEffect(() => {
    if (!playing || count < 2) return;
    const tick = window.setInterval(() => {
      const elapsed = Date.now() - startedAt.current;
      if (elapsed >= DURATION) {
        startedAt.current = Date.now();
        setProgress(0);
        setIndex((i) => (i + 1) % count);
      } else {
        setProgress(elapsed / DURATION);
      }
    }, 60);
    return () => window.clearInterval(tick);
  }, [playing, count]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const active = useMemo(() => items[index], [items, index]);

  if (count === 0 || !active) return null;

  return (
    <section
      className="relative isolate overflow-hidden bg-primary"
      aria-roledescription="carousel"
      aria-label={heading ?? "Featured marble"}
      onMouseEnter={() => setPlaying(false)}
      onMouseLeave={() => setPlaying(true)}
    >
      {heading ? <h2 className="sr-only">{heading}</h2> : null}

      <div className="relative h-[86vh] min-h-[540px] w-full">
        {items.map((item, i) => (
          <div
            key={item.id}
            aria-hidden={i !== index}
            className={`absolute inset-0 overflow-hidden transition-opacity duration-[1200ms] ease-out ${
              i === index ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <img
              src={item.image}
              alt={`${item.name} — ${item.finish} at Aarav Marble House, Newtown, Kolkata`}
              width={1600}
              height={900}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
              sizes="100vw"
              className={`h-full w-full object-cover ${i === index ? "ken-burns" : ""}`}
            />
            <div className="hero-veil absolute inset-0" aria-hidden="true" />
          </div>
        ))}

        {/* Foreground copy — re-animates on every slide change */}
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-7xl px-5 pb-28 sm:px-8 lg:pb-32">
            <div key={active.id} className="max-w-3xl">
              <div className="rise-in flex items-center gap-3">
                <span className="h-px w-10 bg-gold" aria-hidden="true" />
                <p className="eyebrow">
                  {groupLabel(active.group)} · Featured {index + 1} of {count}
                </p>
              </div>
              <h3
                className="rise-in mt-4 font-display text-5xl leading-[1.02] text-primary-foreground sm:text-7xl"
                style={{ animationDelay: "90ms" }}
              >
                {active.name}
              </h3>
              <p
                className="rise-in mt-4 max-w-xl text-sm leading-relaxed text-primary-foreground/75 sm:text-base"
                style={{ animationDelay: "170ms" }}
              >
                {active.finish}
              </p>
              <div
                className="rise-in mt-7 flex flex-wrap items-center gap-x-8 gap-y-4"
                style={{ animationDelay: "240ms" }}
              >
                <p className="font-display text-4xl text-primary-foreground">
                  {formatPrice(active.price)}
                  <span className="ml-2 text-sm text-primary-foreground/70">{active.unit}</span>
                </p>
                <Link
                  to="/product/$slug"
                  params={{ slug: active.id }}
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-sm bg-gold px-7 py-3.5 text-sm font-semibold text-accent-foreground transition-transform hover:-translate-y-0.5"
                >
                  <span className="relative z-10">View details</span>
                  <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  <span className="shimmer-gold absolute inset-0" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail rail */}
        <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-end gap-3 md:flex">
          {items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => jump(i)}
              aria-label={`Show ${item.name}`}
              aria-current={i === index}
              className={`group relative h-16 w-24 overflow-hidden rounded-sm border transition-all duration-500 ${
                i === index
                  ? "border-gold opacity-100 shadow-lift md:h-20 md:w-28"
                  : "border-primary-foreground/30 opacity-55 hover:opacity-90"
              }`}
            >
              <img
                src={item.image}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {i === index && (
                <span
                  className="absolute bottom-0 left-0 h-[3px] bg-gold"
                  style={{ width: `${Math.round(progress * 100)}%` }}
                  aria-hidden="true"
                />
              )}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="absolute right-5 top-1/2 flex -translate-y-1/2 flex-col gap-2 sm:right-8">
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => go(-1)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary-foreground/30 bg-primary/40 text-primary-foreground backdrop-blur transition-all hover:border-gold hover:bg-primary/70"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label={playing ? "Pause slideshow" : "Play slideshow"}
            onClick={() => setPlaying((p) => !p)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary-foreground/30 bg-primary/40 text-primary-foreground backdrop-blur transition-all hover:border-gold hover:bg-primary/70"
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => go(1)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary-foreground/30 bg-primary/40 text-primary-foreground backdrop-blur transition-all hover:border-gold hover:bg-primary/70"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Mobile dots */}
        <div className="absolute bottom-7 left-1/2 flex -translate-x-1/2 gap-2 md:hidden">
          {items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              onClick={() => jump(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-8 bg-gold" : "w-4 bg-primary-foreground/40"
              }`}
            />
          ))}
        </div>

        <div className="absolute inset-x-0 bottom-0 h-px bg-primary-foreground/15" aria-hidden="true">
          <span
            className="block h-px bg-gold transition-[width] duration-100 ease-linear"
            style={{ width: `${Math.round(((index + progress) / count) * 100)}%` }}
          />
        </div>
      </div>
    </section>
  );
}
