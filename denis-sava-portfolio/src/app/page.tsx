import { site } from "@/content/site";

export default function Home() {
  return (
    <div className="relative min-h-dvh px-6 pb-14 pt-16 md:px-12 md:pb-20 md:pt-20">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <h1 className="font-[var(--font-display)] text-[clamp(56px,9vw,120px)] leading-[0.88] tracking-[-0.03em]">
              <span className="whitespace-pre-line uppercase">
                {site.heroLeft}
              </span>
            </h1>

            <p className="mt-10 max-w-[28rem] text-xs uppercase tracking-[0.22em] text-foreground/65">
              {site.tagline}
            </p>
          </div>

          <div className="md:col-span-5 md:flex md:items-end md:justify-end">
            <h2 className="font-[var(--font-display)] text-[clamp(44px,7vw,108px)] leading-[0.9] tracking-[-0.03em] md:text-right">
              <span className="whitespace-pre-line uppercase">
                {site.heroRight}
              </span>
            </h2>
          </div>
        </div>

        <div className="mt-16 flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-foreground/55">
          <span>{site.name}</span>
          <span>Scroll</span>
        </div>
      </div>
    </div>
  );
}
