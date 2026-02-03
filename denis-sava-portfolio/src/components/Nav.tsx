"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { navItems } from "@/content/site";
import { cn } from "@/lib/cn";

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const items = useMemo(() => navItems, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      {/* Desktop nav (top-right, minimal) */}
      {pathname === "/" ? null : (
        <nav className="pointer-events-auto fixed right-6 top-6 z-40 hidden select-none md:block">
          <ul className="space-y-1 text-right text-[11px] uppercase tracking-[0.22em] text-foreground/70">
            {items.map((it) => {
              const active = pathname === it.href;
              return (
                <li key={it.href}>
                  <Link
                    className={cn(
                      "group inline-flex w-full items-center justify-end gap-4 py-1",
                      active && "text-foreground"
                    )}
                    href={it.href}
                  >
                    <span
                      className={cn(
                        "h-px bg-foreground/70 transition-all duration-300",
                        active
                          ? "w-32 opacity-100"
                          : "w-0 opacity-0 group-hover:w-32 group-hover:opacity-100"
                      )}
                    />
                    <span
                      className={cn(
                        "transition-colors",
                        active
                          ? "text-foreground"
                          : "text-foreground/70 group-hover:text-foreground"
                      )}
                    >
                      {it.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}

      {/* Mobile nav */}
      <div className="fixed right-4 top-4 z-50 md:hidden">
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="grid size-10 place-items-center rounded-full border border-foreground/15 bg-background/60 backdrop-blur transition hover:border-foreground/30"
        >
          <span className="block h-[2px] w-5 bg-foreground/80" />
          <span className={cn("block h-[2px] w-5 bg-foreground/80", open && "hidden")} />
        </button>
      </div>

      {open ? (
        <div className="fixed inset-0 z-40 bg-background/90 backdrop-blur md:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0"
          />

          <div className="relative flex min-h-dvh flex-col px-6 pb-10 pt-20">
            <ul className="space-y-4 text-sm uppercase tracking-[0.22em]">
              {items.map((it) => {
                const active = pathname === it.href;
                return (
                  <li key={it.href}>
                    <Link
                      onClick={() => setOpen(false)}
                      className={cn(
                        "block py-2 text-foreground/75 transition-colors hover:text-foreground",
                        active && "text-foreground"
                      )}
                      href={it.href}
                    >
                      {it.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-auto text-xs tracking-wide text-foreground/60">
              Tap anywhere outside the menu button to close, or press ESC.
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

