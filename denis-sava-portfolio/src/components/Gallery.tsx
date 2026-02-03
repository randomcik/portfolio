 "use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { Project } from "@/types/project";
import { cn } from "@/lib/cn";
import { ProjectModal } from "@/components/ProjectModal";

export function Gallery({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Project | null>(null);
  const items = useMemo(() => projects, [projects]);

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        {items.map((p) => {
          const isActive = active?.slug === p.slug;
          return (
            <button
              key={p.slug}
              type="button"
              onClick={() => setActive(p)}
              className={cn(
                "group text-left",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30"
              )}
            >
              <div
                className={cn(
                  "relative aspect-[4/3] overflow-hidden rounded-xl border border-foreground/10 bg-background",
                  "transition",
                  isActive && "border-foreground/30"
                )}
              >
                <Image
                  src={p.coverImage}
                  alt={p.title}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>

              <div className="mt-3 flex items-baseline justify-between gap-3">
                <div className="text-sm text-foreground/80">{p.title}</div>
                {p.year ? (
                  <div className="text-[11px] uppercase tracking-[0.18em] text-foreground/45">
                    {p.year}
                  </div>
                ) : null}
              </div>
            </button>
          );
        })}
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </div>
  );
}

