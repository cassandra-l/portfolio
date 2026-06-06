export interface Project {
  id: number;
  title: string;
  category: "web dev" | "data";
  image: string;
  link: string;
}

export const PROJECTS_DATA: Project[] = [
  {
    id: 1,
    title: "HushNav - Quiet Route Navigation Map",
    category: "web dev",
    image: "/images/hushnav.png",
    link: "https://hushnav.app",
  },
  {
    id: 2,
    title: "Retail Sales Time-Series Forecasting",
    category: "data",
    image: "/images/retail-forecast.png",
    link: "https://your-data-analysis-link.com",
  },
  {
    id: 3,
    title: "Mastodon Social Network Web Client",
    category: "web dev",
    image: "/images/mastodon.png",
    link: "https://your-mastodon-link.com",
  },
  {
    id: 4,
    title: "Digital Flower Bouquet Builder Website",
    category: "web dev",
    image: "/images/flower-bouquet.png",
    link: "https://your-bouquet-link.com",
  },
];
