export type ProjectCategory = "graphic" | "web" | "uiux";

export type Project = {
  slug: string;
  category: ProjectCategory;
  title: string;
  description?: string;
  year?: string;
  client?: string;
  role?: string;
  tags?: string[];
  coverImage: string; // public path (e.g. /projects/graphic/foo/cover.jpg)
  images: string[]; // public paths
};

