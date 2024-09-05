// models/user.model.ts
export interface Profile {
  name: string;
  role: string;
  location: string;
  experienceYears: number;
  clients: number;
  projects: number;
  services: string[];
  profiles: { name: string; link: string; icon: string }[];
}
