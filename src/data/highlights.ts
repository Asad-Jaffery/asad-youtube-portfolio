export type Highlight = {
  id: string;
  title: string;
  publisher: string;
  date: string;
  publishedAt: string;
  image: string;
  imageAlt: string;
  logo: string;
  url: string;
};

export const highlights: readonly Highlight[] = [
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
    url: 'https://ischool.uw.edu/news/2025/05/students-develop-tool-track-kudos-among-co-workers',
  },
];
