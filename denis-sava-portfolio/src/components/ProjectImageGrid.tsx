"use client";

import Image from "next/image";
import { useState } from "react";
import type { Project } from "@/types/project";
import { ProjectModal } from "@/components/ProjectModal";

export function ProjectImageGrid({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        {project.images.map((src, idx) => (
          <button
            key={`${src}-${idx}`}
            type="button"
            onClick={() => {
              setIndex(idx);
              setOpen(true);
            }}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-foreground/10 bg-background text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30"
          >
            <Image
              src={src}
              alt={`${project.title} ${idx + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </button>
        ))}
      </div>

      <ProjectModal
        project={open ? project : null}
        initialIndex={index}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}

