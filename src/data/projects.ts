export type Project = {
  id: string;
  company: string;
  team?: string;
  kind: "career" | "project";
  title: string;
  category: "Data engineering" | "Data analysis" | "Software" | "Life & career";
  period: string;
  duration: string;
  kicker: string;
  headline: readonly [string, string];
  logo: string;
  photo?: string;
};

export const projects: readonly Project[] = [
  {
    id: "shopify",
    company: "Shopify",
    team: "Analytics Engineering",
    kind: "career",
    title: "Intern",
    category: "Data engineering",
    period: "Jan 2026 – Aug 2026",
    duration: "8 months",
    kicker: "SHOPIFY / ANALYTICS ENGINEERING",
    headline: ["big data.", "bigger picture."],
    logo: "/assets/shopify.svg",
  },
  {
    id: "tesla",
    company: "Tesla",
    team: "Energy, Residential Service Engineering",
    kind: "career",
    title: "Intern",
    category: "Data engineering",
    period: "Jun 2025 – Sep 2025",
    duration: "4 months",
    kicker: "TESLA / RESIDENTIAL SERVICE ENGINEERING",
    headline: ["less noise.", "more signal."],
    logo: "/assets/tesla.png",
  },
  {
    id: "usafacts",
    company: "USAFacts",
    team: "Product",
    kind: "career",
    title: "Intern",
    category: "Data analysis",
    period: "Jun 2024 – Sep 2024",
    duration: "4 months",
    kicker: "USAFACTS / PRODUCT",
    headline: ["public data.", "clearer stories."],
    logo: "/assets/usafacts.svg",
  },
  {
    id: "recognize",
    company: "Recognize × UW iSchool",
    kind: "project",
    title: "From a capstone idea to a real product",
    category: "Software",
    period: "Jan–Jun 2025",
    duration: "CAPSTONE 2025",
    kicker: "RECOGNIZE / CAPSTONE",
    headline: ["WE BUILT THIS.", ""],
    logo: "/assets/recognize.png",
    photo:
      "https://ischool.uw.edu/sites/default/files/2025-05/recognize1440.jpg",
  },
];
