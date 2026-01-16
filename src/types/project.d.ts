export interface IProject {
  slug: string;
  title: string;
  shortDescription: string; // For home page preview
  image: string; // Image path for home page
  largeImage?: string;
  challenge: string;
  solution: string;
  techStack: string[];
  role: string;
  typeResource?: 'video' | 'article' | 'repository' | 'demo';
  resourceLink?: string;
}
