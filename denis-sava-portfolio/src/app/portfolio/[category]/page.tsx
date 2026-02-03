import { notFound } from "next/navigation";
import { categoryMeta, getProjectsByCategory } from "@/content/projects";
import type { ProjectCategory } from "@/types/project";
import { Gallery } from "@/components/Gallery";

type Params = { category: string };

function isCategory(v: string): v is ProjectCategory {
  return v === "graphic" || v === "web" || v === "uiux";
}

export function generateStaticParams() {
  return [{ category: "graphic" }, { category: "web" }, { category: "uiux" }];
}

export function generateMetadata({ params }: { params: Params }) {
  if (!isCategory(params.category)) return {};
  return { title: categoryMeta[params.category].title };
}

export default function PortfolioCategoryPage({ params }: { params: Params }) {
  if (!isCategory(params.category)) notFound();
  const category = params.category;
  const meta = categoryMeta[category];
  const items = getProjectsByCategory(category);

  return (
    <div className="px-6 pb-16 pt-20 md:px-12 md:pt-24">
      <div className="mx-auto max-w-[1400px]">
        <header className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <h1 className="font-[var(--font-display)] text-[clamp(40px,5vw,84px)] leading-[0.95] tracking-[-0.03em] uppercase">
              {meta.title}
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-foreground/70">
              {meta.description}
            </p>
          </div>

          <div className="md:col-span-5 md:text-right">
            <div className="text-[11px] uppercase tracking-[0.22em] text-foreground/55">
              {items.length} projects
            </div>
          </div>
        </header>

        <div className="mt-12">
          <Gallery projects={items} />
        </div>
      </div>
    </div>
  );
}

