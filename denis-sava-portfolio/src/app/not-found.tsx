import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid min-h-dvh place-items-center px-6">
      <div className="max-w-md text-center">
        <div className="text-[11px] uppercase tracking-[0.22em] text-foreground/60">
          404
        </div>
        <h1 className="mt-3 font-[var(--font-display)] text-4xl tracking-[-0.03em] uppercase">
          Page not found
        </h1>
        <p className="mt-4 text-sm leading-7 text-foreground/70">
          The page you’re looking for doesn’t exist.
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="text-[11px] uppercase tracking-[0.22em] underline decoration-foreground/20 underline-offset-4 hover:decoration-foreground/50"
          >
            Back home
          </Link>
        </div>
      </div>
    </div>
  );
}

