import type { Project, ProjectCategory } from "@/types/project";

export const categoryMeta: Record<
  ProjectCategory,
  { title: string; description: string }
> = {
  graphic: {
    title: "Graphic Design",
    description: "Branding, print, packaging, and visual systems.",
  },
  web: {
    title: "Web Design",
    description: "Websites, landing pages, and web experiences.",
  },
  uiux: {
    title: "UI/UX Design",
    description: "Product UI, UX flows, and interface systems.",
  },
};

const placeholder = "/projects/placeholder.svg";
const comingSoon = "/coming.webp";

export const projects: Project[] = [
  {
    slug: "grooming-pet",
    category: "graphic",
    title: "Grooming Pet Logo Design",
    description:
      "Brand and visual redesign materials.",
    year: "2024",
    role: "Designer",
    tags: ["Graphic Design", "Branding"],
    coverImage: "/projects/graphic/grooming-pet/Grooming Pet S1.webp",
    images: [
      "/projects/graphic/grooming-pet/Grooming Pet S1.webp",
      "/projects/graphic/grooming-pet/Grooming Pet S2.webp",
      "/projects/graphic/grooming-pet/Grooming Pet S3.webp",
      "/projects/graphic/grooming-pet/Grooming Pet S4.webp",
      "/projects/graphic/grooming-pet/Grooming Pet S5.webp",
    ],
  },
  {
    slug: "sample-landing-page",
    category: "web",
    title: "Coming Soon",
    description: "A minimal landing page concept with strong typography.",
    year: "2026",
    role: "Designer",
    tags: ["Web", "Art Direction"],
    coverImage: comingSoon,
    images: [comingSoon],
  },
  {
    slug: "sample-product-ui",
    category: "uiux",
    title: "Coming Soon",
    description: "A product UI exploration with component-driven layout.",
    year: "2026",
    role: "UI/UX Designer",
    tags: ["UI/UX", "Design System"],
    coverImage: comingSoon,
    images: [comingSoon],
  },
];

export function getProjectsByCategory(category: ProjectCategory) {
  return projects.filter((p) => p.category === category);
}

