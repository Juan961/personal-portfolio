export interface IProject {
  title: string;
  challenge: string;
  solution: string;
  techStack: string[];
  role: string;
  typeResource?: 'video' | 'article' | 'repository' | 'demo';
  resourceLink?: string;
}
