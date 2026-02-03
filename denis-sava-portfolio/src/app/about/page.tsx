import Link from "next/link";
import { site } from "@/content/site";
import { ContactForm } from "@/components/ContactForm";

export const metadata = {
  title: "About Me",
};

export default function AboutPage() {
  return (
    <div className="px-6 pb-16 pt-20 md:px-12 md:pt-24">
      <div className="mx-auto max-w-[1100px]">
        <h1 className="font-[var(--font-display)] text-[clamp(40px,5vw,72px)] leading-[0.95] tracking-[-0.03em] uppercase">
          About Me
        </h1>

        <div className="mt-10 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="text-base leading-8 text-foreground/75">
              {site.tagline}
            </p>

            <p className="mt-6 text-sm leading-7 text-foreground/70">
              This page is intentionally minimal. Add a short bio, your process,
              and what kinds of projects you’re available for.
            </p>
          </div>

          <aside className="md:col-span-5">
            <div className="rounded-2xl border border-foreground/10 bg-background/50 p-6">
              <div className="text-[11px] uppercase tracking-[0.22em] text-foreground/60">
                Contact
              </div>
              <p className="mt-4 text-sm leading-7 text-foreground/70">
                Send a short message and I’ll reply by email.
              </p>

              <div className="mt-6">
                <ContactForm />
              </div>

              <div className="mt-8">
                <Link
                  className="text-[11px] uppercase tracking-[0.22em] text-foreground/70 underline decoration-foreground/20 underline-offset-4 hover:decoration-foreground/50"
                  href="/"
                >
                  Back home
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

