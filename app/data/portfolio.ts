export interface Project {
  id: number;
  title: string;
  subtitle?: string;
  category: ("web dev" | "data")[];
  tech?: string[];
  image: string;
  link: string;
}

export const PROJECTS_DATA: Project[] = [
  {
    id: 1,
    title: "HushNav",
    subtitle: "Quiet route navigation across Melbourne CBD",
    category: ["web dev", "data"],
    tech: ["React", "TypeScript", "AWS", "Python", "Mapbox"],
    image: "/images/hushnav6.jpg",
    link: "https://hushnav.app",
  },
  {
    id: 2,
    title: "Australian Retail Trade Forecasting",
    subtitle: "Predicting future Australian retail turnover",
    category: ["data"],
    tech: [
      "R",
      "Time Series Data Analysis",
      "Forecasting",
      "Statistical Modeling",
    ],
    image: "/images/aus-retail2.jpg",
    link: "https://github.com/cassandra-l/australian-retail-trade-forecasting",
  },
  {
    id: 3,
    title: "Mastodon Web Client",
    subtitle: "A custom web client for Mastodon social network",
    category: ["web dev"],
    tech: ["React", "TypeScript", "Mastodon API"],
    image: "/images/mastodon-client.jpg",
    link: "https://mastodon-client.cassandra-l.workers.dev/",
  },
  {
    id: 4,
    title: "Melbourne Urban Heat Dashboard",
    subtitle: "Visualizing urban heat patterns in Melbourne",
    category: ["data"],
    tech: ["JavaScript", "D3.js", "Data Visualization", "Data Analysis"],
    image: "/images/urban-heat3.jpg",
    link: "https://urban-heat-dashboard.cassandra-l.workers.dev/",
  },
];
