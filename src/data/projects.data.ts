/** @format */

import type { TypesProjectsTranslates } from "../constants/index.types";
const ImagesProjects = [
  {
    id: 1,
    images: ["/images/webp/full24_01.webp", "/images/webp/full24_02.webp"],
  },
  {
    id: 2,
    images: ["/images/webp/audec_01.webp"],
  },
  {
    id: 3,
    images: ["/images/webp/luigi_01.webp", "/images/webp/luigi_02.webp"],
  },
  {
    id: 4,
    images: [
      "/images/webp/radiobellavista_01.webp",
      "/images/webp/radiobellavista_02.webp",
    ],
  },
  {
    id: 5,
    images: ["/images/webp/sanmartin_01.webp"],
  },
  {
    id: 6,
    images: [
      "/images/webp/musicquiz_01.webp",
      "/images/webp/musicquiz_02.webp",
    ],
  },
];
export const ProjectsData: TypesProjectsTranslates = {
  es: [
    {
      id: 1,
      name: "Full24",
      description:
        "App para Androi/iOS. Tienda de comestibles. Compras, Promociones, Notificaciones ",
      images: ImagesProjects.find((item) => item.id === 1)?.images!,
      tags: ["React", "Native Base", "Typescript"],
      link: "https://play.google.com/store/apps/details?id=com.full24.app&hl=es_AR&gl=US",
    },
    {
      id: 2,
      name: "Audec",
      description:
        "Software para la gestión de peritajes y tasación de vehiculos",
      images: ImagesProjects.find((item) => item.id === 2)?.images!,
      tags: ["Next.js", "Tailwind", "Typescript"],
      link: null,
    },
    {
      id: 3,
      name: "Luigi Heladeria",
      description: "App Android/iOS de promociones y cupones de descuentos",
      images: ImagesProjects.find((item) => item.id === 3)?.images!,
      tags: ["React Native", "Styled Components", "Typescript"],
      link: "https://play.google.com/store/apps/details?id=com.luigi.app&hl=es_AR&gl=US&pli=1",
    },
    {
      id: 4,
      name: "Radio Bella Vista",
      description:
        "App Android/iOS streaming de radio y noticias. Chat, Notificaciones",
      images: ImagesProjects.find((item) => item.id === 4)?.images!,
      tags: ["React Native", "Styled Components", "Javascript"],
      link: "https://play.google.com/store/apps/details?id=com.radiobv.app&hl=es_AR&gl=US",
    },
    {
      id: 5,
      name: "Club San Martin",
      description: "PWA para la gestion de socios y pago cuotas",
      images: ImagesProjects.find((item) => item.id === 5)?.images!,
      tags: ["Next.js", "MUI", "Typscript"],
      link: null,
    },
    {
      id: 6,
      name: "MusicQuiz",
      description: "Simple juego utilizando API Spotify",
      images: ImagesProjects.find((item) => item.id === 6)?.images!,
      tags: ["Next.js", "MUI", "Typscript"],
      link: "https://musicquiz-alpha.vercel.app/",
    },
    // {
    //   id: 7,
    //   name: "NBA Team",
    //   description: "Web con info de juegadores y equipos de la NBA",
    //    images: ImagesProjects.find(item=>item.id === 1)?.images!,
    //   tags: ["Next.js", "MUI", "Typscript"],
    //   link: "https://nba-game-nu.vercel.app/",
    // },
  ],
  en: [
    {
      id: 1,
      name: "Full24",
      description:
        "App for Android/iOS. Grocery. Purchases, Promotions, Notifications",
      images: ImagesProjects.find((item) => item.id === 1)?.images!,
      tags: ["React Native", "Native Base"],
      link: "https://play.google.com/store/apps/details?id=com.full24.app&hl=es_AR&gl=US",
    },
    {
      id: 2,
      name: "Audec",
      description:
        "Software for the management of expert reports and vehicle valuation",
      images: ImagesProjects.find((item) => item.id === 2)?.images!,
      tags: ["Next.js", "Tailwind", "Typescript"],
      link: null,
    },
    {
      id: 3,
      name: "Luigi Heladeria",
      description: "Android/iOS app for promotions and discount coupons",
      images: ImagesProjects.find((item) => item.id === 3)?.images!,
      tags: ["React Native", "Styled Components", "Typescript"],
      link: "https://play.google.com/store/apps/details?id=com.luigi.app&hl=es_AR&gl=US&pli=1",
    },
    {
      id: 4,
      name: "Radio Bella Vista",
      description:
        "Android/iOS app streaming radio and news. Chat, Notifications",
      images: ImagesProjects.find((item) => item.id === 4)?.images!,
      tags: ["React Native", "Styled Components", "Javascript"],
      link: "https://play.google.com/store/apps/details?id=com.radiobv.app&hl=es_AR&gl=US",
    },
    {
      id: 5,
      name: "Club San Martin",
      description: "PWA for member management and payment of fees",
      images: ImagesProjects.find((item) => item.id === 5)?.images!,
      tags: ["Next.js", "MUI", "Typscript"],
      link: null,
    },
    {
      id: 6,
      name: "MusicQuiz",
      description: "Simple game using Spotify API",
      images: ImagesProjects.find((item) => item.id === 6)?.images!,
      tags: ["Next.js", "MUI", "Typscript"],
      link: "https://musicquiz-alpha.vercel.app/",
    },
    // {
    //   id: 7,
    //   name: "NBA Team",
    //   description: "Website with information on NBA players and teams",
    //    images: ImagesProjects.find(item=>item.id === 1)?.images!,
    //   tags: ["Next.js", "MUI", "Typscript"],
    //   link: "https://nba-game-nu.vercel.app/",
    // },
  ],
};
