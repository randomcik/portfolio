import { site } from "@/content/site";
import Link from "next/link";
import { navItems } from "@/content/site";
import { cn } from "@/lib/cn";

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
            <div className="md:text-right">
              <h2 className="font-[var(--font-display)] text-[clamp(44px,7vw,108px)] leading-[0.9] tracking-[-0.03em] md:text-right">
                <span className="whitespace-pre-line uppercase">
                  {site.heroRight}
                </span>
              </h2>

              <nav className="mt-10 hidden md:block">
                <ul className="space-y-2 text-right text-[11px] uppercase tracking-[0.22em] text-foreground/70">
                  {navItems.map((it) => (
                    <li key={it.href}>
                      <Link
                        className="group inline-flex w-full items-center justify-end gap-4 py-1"
                        href={it.href}
                      >
                        <span
                          className={cn(
                            "h-px bg-foreground/70 transition-all duration-300",
                            it.href === "/"
                              ? "w-64 opacity-100"
                              : "w-0 opacity-0 group-hover:w-64 group-hover:opacity-100"
                          )}
                        />
                        <span
                          className={cn(
                            "transition-colors",
                            it.href === "/"
                              ? "text-foreground"
                              : "text-foreground/70 group-hover:text-foreground"
                          )}
                        >
                          {it.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>

        <div className="mt-16 flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-foreground/55">
          <span>{site.name}</span>
        </div>
      </div>
    </div>
  );
}
