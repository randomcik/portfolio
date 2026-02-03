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

export const projects: Project[] = [
  {
    slug: "grooming-pet",
    category: "graphic",
    title: "Grooming Pet Redesign",
    description:
      "Brand and visual redesign materials.",
    year: "2026",
    role: "Designer",
    tags: ["Graphic Design", "Branding"],
    coverImage: "/projects/graphic/Grooming Pet Redesign S 5.jpg",
    images: [
      "/projects/graphic/Grooming Pet Redesign S 4.jpg",
      "/projects/graphic/Grooming Pet Redesign S 5.jpg",
      "/projects/graphic/Grooming Pet Redesign S 6.jpg",
    ],
  },
  {
    slug: "sample-landing-page",
    category: "web",
    title: "Sample Landing Page",
    description: "A minimal landing page concept with strong typography.",
    year: "2026",
    role: "Designer",
    tags: ["Web", "Art Direction"],
    coverImage: placeholder,
    images: [placeholder, placeholder],
  },
  {
    slug: "sample-product-ui",
    category: "uiux",
    title: "Sample Product UI",
    description: "A product UI exploration with component-driven layout.",
    year: "2026",
    role: "UI/UX Designer",
    tags: ["UI/UX", "Design System"],
    coverImage: placeholder,
    images: [placeholder, placeholder, placeholder, placeholder],
  },
];

export function getProjectsByCategory(category: ProjectCategory) {
  return projects.filter((p) => p.category === category);
}

