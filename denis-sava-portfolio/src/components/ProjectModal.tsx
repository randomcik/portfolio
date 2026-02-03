"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Project } from "@/types/project";

export function ProjectModal({
  project,
  initialIndex = 0,
  onClose,
}: {
  project: Project | null;
  initialIndex?: number;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const images = useMemo(() => project?.images ?? [], [project]);

  const isDesktopCarousel = () =>
    typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };
    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, [onClose]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (project) {
      if (!dialog.open) dialog.showModal();
      // Scroll to requested image when opening
      requestAnimationFrame(() => {
        const scroller = scrollerRef.current;
        if (!scroller) return;
        const children = Array.from(scroller.children) as HTMLElement[];
        const idx = Math.max(0, Math.min(children.length - 1, initialIndex));
        const target = children[idx];
        if (!target) return;
        setActiveIndex(idx);
        if (isDesktopCarousel()) {
          scroller.scrollTo({ left: target.offsetLeft, behavior: "auto" });
        } else {
          target.scrollIntoView({ block: "start", behavior: "auto" });
        }
      });
      return;
    }

    if (dialog.open) dialog.close();
  }, [project, initialIndex]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !project) return;

    const onKeyDown = (e: KeyboardEvent) => {
      const scroller = scrollerRef.current;
      if (!scroller) return;
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      if (!isDesktopCarousel()) return;

      e.preventDefault();
      const delta = e.key === "ArrowRight" ? 1 : -1;
      const width = scroller.clientWidth;
      scroller.scrollBy({ left: delta * Math.max(240, width * 0.85), behavior: "smooth" });
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [project]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller || !project) return;
    if (!isDesktopCarousel()) return;

    const children = Array.from(scroller.children) as HTMLElement[];
    const onScroll = () => {
      const sl = scroller.scrollLeft;
      let bestIdx = 0;
      let bestDist = Number.POSITIVE_INFINITY;
      for (let i = 0; i < children.length; i++) {
        const dist = Math.abs(children[i]!.offsetLeft - sl);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = i;
        }
      }
      setActiveIndex(bestIdx);
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => scroller.removeEventListener("scroll", onScroll);
  }, [project]);

  function scrollToIndex(idx: number) {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const children = Array.from(scroller.children) as HTMLElement[];
    const i = Math.max(0, Math.min(children.length - 1, idx));
    const target = children[i];
    if (!target) return;
    scroller.scrollTo({ left: target.offsetLeft, behavior: "smooth" });
  }

  return (
    <dialog
      ref={dialogRef}
      className="m-0 w-full max-w-none bg-transparent p-0 text-foreground"
    >
      <div
        className="min-h-dvh bg-background/95 px-5 pb-10 pt-16 md:px-10 md:pb-14 md:pt-20"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-foreground/55">
                Project
              </div>
              <h3 className="mt-3 font-[var(--font-display)] text-[clamp(26px,3.2vw,48px)] leading-[0.95] tracking-[-0.03em] uppercase">
                {project?.title ?? ""}
              </h3>
              {project?.description ? (
                <p className="mt-4 max-w-2xl text-sm leading-7 text-foreground/70">
                  {project.description}
                </p>
              ) : null}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="mt-1 rounded-full border border-foreground/15 bg-background/60 px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-foreground/70 backdrop-blur transition hover:border-foreground/30 hover:text-foreground"
            >
              Close
            </button>
          </div>

          <div className="mt-10">
            <div
              ref={scrollerRef}
              className="grid gap-4 md:flex md:snap-x md:snap-mandatory md:gap-4 md:overflow-x-auto md:pb-2 md:[scrollbar-width:none] md:[&::-webkit-scrollbar]:hidden"
              aria-label="Project images"
              onWheel={(e) => {
                // Desktop: let vertical wheel scroll the horizontal carousel.
                // Mobile remains vertical stacking (no special handling).
                if (!isDesktopCarousel()) return;
                const scroller = scrollerRef.current;
                if (!scroller) return;

                // If the user is already doing horizontal scrolling, don't interfere.
                const absX = Math.abs(e.deltaX);
                const absY = Math.abs(e.deltaY);
                if (absX > absY) return;

                e.preventDefault();
                scroller.scrollLeft += e.deltaY;
              }}
              style={{
                touchAction: "pan-y",
              }}
            >
              {images.map((src, idx) => (
                <div
                  key={`${src}-${idx}`}
                  className="relative w-full overflow-hidden rounded-2xl border border-foreground/10 bg-background md:w-[min(92vw,980px)] md:flex-none md:snap-center"
                  style={{
                    aspectRatio: "16 / 10",
                  }}
                >
                  <Image
                    src={src}
                    alt={`${project?.title ?? "Project"} image ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 92vw, 980px"
                    priority={idx === 0}
                  />
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-foreground/55">
              <div>{images.length} images</div>
              <div className="hidden md:flex items-center gap-3">
                <div>Scroll or use</div>
                <button
                  type="button"
                  aria-label="Previous image"
                  onClick={() => scrollToIndex(activeIndex - 1)}
                  className="grid size-9 place-items-center rounded-full border border-foreground/15 bg-background/60 backdrop-blur transition hover:border-foreground/30 hover:text-foreground disabled:opacity-40"
                  disabled={activeIndex <= 0}
                >
                  ←
                </button>
                <button
                  type="button"
                  aria-label="Next image"
                  onClick={() => scrollToIndex(activeIndex + 1)}
                  className="grid size-9 place-items-center rounded-full border border-foreground/15 bg-background/60 backdrop-blur transition hover:border-foreground/30 hover:text-foreground disabled:opacity-40"
                  disabled={activeIndex >= images.length - 1}
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}

