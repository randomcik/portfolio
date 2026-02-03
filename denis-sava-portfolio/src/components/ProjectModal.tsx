"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";
import type { Project } from "@/types/project";

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const images = useMemo(() => project?.images ?? [], [project]);

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
      // Reset scroll to first image when opening
      requestAnimationFrame(() => {
        scrollerRef.current?.scrollTo({ left: 0, behavior: "auto" });
      });
      return;
    }

    if (dialog.open) dialog.close();
  }, [project]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !project) return;

    const onKeyDown = (e: KeyboardEvent) => {
      const scroller = scrollerRef.current;
      if (!scroller) return;
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;

      e.preventDefault();
      const delta = e.key === "ArrowRight" ? 1 : -1;
      const width = scroller.clientWidth;
      scroller.scrollBy({ left: delta * Math.max(240, width * 0.85), behavior: "smooth" });
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [project]);

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
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              aria-label="Project images"
            >
              {images.map((src, idx) => (
                <div
                  key={`${src}-${idx}`}
                  className="relative snap-center overflow-hidden rounded-2xl border border-foreground/10 bg-background"
                  style={{
                    width: "min(92vw, 980px)",
                    aspectRatio: "16 / 10",
                    flex: "0 0 auto",
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
              <div className="hidden md:block">Use ← → to scroll</div>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}

