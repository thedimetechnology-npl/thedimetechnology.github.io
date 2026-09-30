export type AdminPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  url?: string;
  image?: string;
  sections: { heading: string; paragraphs: string[] }[];
};

export type AdminTestimonial = {
  id: string;
  name: string;
  location: string;
  rating: number;
  feedback: string;
  image: string;
  company: string;
  designation: string;
};

export type AdminClient = {
  id: string;
  name: string;
  logo: string;
};

export type AdminTeamMember = {
  id: string;
  name: string;
  role: string;
  experience: string;
  tech: string[];
  photo: string;
  category: string;
  founder: boolean;
};

export type AdminCareer = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  requirements: string[];
  applyUrl: string;
  active: boolean;
};

export type AdminCourse = {
  id: string;
  title: string;
  category: string;
  level: string;
  duration: string;
  mode: string;
  price: string;
  description: string;
  topics: string[];
  enrollUrl: string;
  active: boolean;
};
