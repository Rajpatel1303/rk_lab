export type ProjectCategory = 
  | "Website Development"
  | "Software Development"
  | "SaaS Applications"
  | "AI Solutions";

export type ServiceCategory = 
  | "Software Development"
  | "Web & Mobile Applications"
  | "AI Automation Solutions"
  | "Networking Solutions"
  | "CCTV & Surveillance Systems"
  | "Cloud & Server Infrastructure"
  | "IT Consulting"
  | "AMC & Maintenance";

export interface ProjectStat {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  url: string;
  description: string;
  category: ProjectCategory;
  tags: string[];
  year: string;
  client: string;
  role: string;
  highlightColor: "cyan" | "purple" | "blue" | "emerald";
  stats: ProjectStat[];
  features: string[];
  accentGradient: string;
  status?: "Live" | "Under Development" | "Beta";
}

export interface Developer {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  riveFile?: string;
  skills: string[];
  socials: {
    platform: "GitHub" | "LinkedIn" | "Twitter" | "Email";
    url: string;
  }[];
  signatureQuote: string;
  focus: string;
}

export interface ServiceItem {
  id: string;
  title: ServiceCategory;
  description: string;
  iconName: string;
  size: "small" | "medium" | "large" | "wide";
  bgGradient: string;
  features: string[];
  metrics: string;
}

export interface Technology {
  name: string;
  category: "Languages" | "Frameworks" | "Databases" | "AI & Cloud" | "Tools & Design";
  iconName: string;
  glowColor: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  duration: string;
  iconName: string;
  details: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  projectRelation: string;
  verified: boolean;
}
