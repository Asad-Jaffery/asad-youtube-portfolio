export type Project = {
  id: string;
  company: string;
  team: string;
  title: string;
  category: string;
  period: string;
  duration: string;
  kicker: string;
  logo: string;
  avatarLogo?: string;
  details: readonly string[];
};

export const projects: readonly Project[] = [
  {
    id: "shopify",
    company: "Shopify",
    team: "Analytics Engineering",
    title: "Intern",
    category: "Data engineering",
    period: "Jan 2026 – Aug 2026",
    duration: "8 months",
    kicker: "SHOPIFY / ANALYTICS ENGINEERING",
    logo: "/assets/shopify.svg",
    details: [
      "Cut about 25% (2 days) of BigQuery slot time per rebuild from a company-wide GMV metric by consolidating pipeline logic into a centralized data model, with 99.99% reconciliation accuracy across 5.2 billion orders.",
      "Implemented dbt versioning across more than 400 data models, adding backwards compatibility for downstream consumers.",
      "Built three dbt pipelines to reconcile internal AI usage with vendor billing data, uncovering a JSON parsing bug that undercounted company-wide AI spending by $800K per year.",
      "Built a training pipeline for a BigQuery ML ARIMA anomaly-detection model that alerts on unparseable user-agent strings before they corrupt order-event attribution data.",
    ],
  },
  {
    id: "tesla",
    company: "Tesla",
    team: "Energy, Residential Service Engineering",
    title: "Intern",
    category: "Data engineering",
    period: "Jun 2025 – Sep 2025",
    duration: "4 months",
    kicker: "TESLA / RESIDENTIAL SERVICE ENGINEERING",
    logo: "/assets/tesla.png",
    avatarLogo: "/assets/tesla-channel.png",
    details: [
      "Developed SQL pipelines for 15 new autoticketing workflows, increasing automated Powerwall 3 failure reporting by 16% and Powerwall 2 reporting by 29%.",
      "Uncovered and drove an investigation into a Powerwall 2 failure mode affecting 27% of returned units.",
      "Automated ticket closure for six Powerwall failure modes when in-fleet units self-recovered, saving support teams more than 1,000 hours of manual investigation.",
    ],
  },
  {
    id: "usafacts",
    company: "USAFacts",
    team: "Product",
    title: "Intern",
    category: "Data analysis",
    period: "Jun 2024 – Sep 2024",
    duration: "4 months",
    kicker: "USAFACTS / PRODUCT",
    logo: "/assets/usafacts.svg",
    details: [
      "Designed, built, and deployed a reusable barcode visualization template with the Flourish SDK and D3.js.",
      "Increased user engagement by 22% across 51 interactive product pages by rewriting content, improving data visualizations with Flourish and Python, and testing for page bugs.",
    ],
  },
];
