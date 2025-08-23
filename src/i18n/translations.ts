import { nav as esNav } from "./translations/es/nav";
import { hero as esHero } from "./translations/es/hero";
import { about as esAbout } from "./translations/es/about";

import { nav as enNav } from "./translations/en/nav";
import { hero as enHero } from "./translations/en/hero";
import { about as enAbout } from "./translations/en/about";

export const translations = {
  es: {
    nav: esNav,
    hero: esHero,
    experience: {
      title: "Experiencia laboral",
    },
    projects: {
      title: "Proyectos Destacados",
      github_button: "Todos mis proyectos",
    },
    moreProjects: {
      title: "Más proyectos",
    },
    about: esAbout,
    contact: {
      title: "Pongámonos en contacto",
      text: "No dudes de escribirme en",
    },
    footer: {
      text: "Hecho con el 🩶 por Franco Galfré",
    },
  },

  en: {
    nav: enNav,
    hero: enHero,
    experience: {
      title: "Work experience",
    },
    projects: {
      title: "Selected Projects",
      github_button: "All my projects",
    },
    moreProjects: {
      title: "More projects",
    },
    about: enAbout,
    contact: {
      title: "Let's connect",
      text: "Feel free to contact me at",
    },
    footer: {
      text: "Made with 🩶 by Franco Galfré",
    },
  },
};
