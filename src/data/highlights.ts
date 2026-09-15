export type Highlight = {
  id: string;
  title: string;
  publisher: string;
  date: string;
  publishedAt: string;
  image: string;
  imageAlt: string;
  logo: string;
  badge: string;
  description?: string;
  url?: string;
};

export const highlights: readonly Highlight[] = [
  {
    id: 'shopify-cto-meeting',
    title: "Meeting Shopify's CTO, Mikhail Parakhin",
    publisher: 'Shopify Internship',
    date: 'August 2026',
    publishedAt: '2026-08',
    image: '/assets/shopify-cto-interns-august-2026.jpeg',
    imageAlt:
      'Asad Jaffery with other high-performing Shopify interns and the Shopify CTO',
    logo: '/assets/shopify.svg',
    badge: 'Highlight',
    description:
      'In August 2026, I was invited to join Shopify CTO, Mikhail Parakhin, and a group of other interns for lunch due to high performance during my internship.',
  },
  {
    id: 'uw-ischool-graduation',
    title: 'Graduating from the UW Information School',
    publisher: 'University of Washington',
    date: 'June 2026',
    publishedAt: '2026-06',
    image: '/assets/uw-ischool-graduation-2026.jpeg',
    imageAlt:
      'Asad Jaffery in graduation regalia in front of the University of Washington W',
    logo: '/assets/uw-ischool.png',
    badge: 'Milestone',
    description:
      'Graduated from the University of Washington Information School with a B.S. in Informatics and a concentration in Data Science.',
  },
  {
    id: 'recognize',
    title: 'UW iSchool Capstone Project Highlight',
    publisher: 'UW Information School',
    date: 'May 28, 2025',
    publishedAt: '2025-05-28',
    image:
      'https://ischool.uw.edu/sites/default/files/2025-05/recognize1440.jpg',
    imageAlt: 'Asad Jaffery and the Recognize capstone team',
    logo: '/assets/recognize.png',
    badge: 'Article',
    url: 'https://ischool.uw.edu/news/2025/05/students-develop-tool-track-kudos-among-co-workers',
  },
  {
    id: 'usafacts-steve-ballmer-presentation',
    title: 'Presenting to Steve Ballmer at USAFacts',
    publisher: 'USAFacts Internship',
    date: '2024',
    publishedAt: '2024',
    image: '/assets/usafacts-steve-ballmer-presentation-upright-2024.jpeg',
    imageAlt: 'Asad Jaffery, Steve Ballmer, and the USAFacts internship team',
    logo: '/assets/usafacts.svg',
    badge: 'Highlight',
    description:
      'During my time at USAFacts, I got to meet and present my work to former Microsoft CEO, Steve Ballmer.',
  },
];
