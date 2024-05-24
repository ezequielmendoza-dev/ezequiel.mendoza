/** @format */

export type TypesProjects = {
  id: number;
  name: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
};
export type TypesExperiences = {
  name: string;
  period: string;
  description: string;
};
export type TypesProjectsTranslates = {
  es: TypesProjects[];
  en: TypesProjects[];
};
export type TypesExperiencesTranslates = {
  es: TypesExperiences[];
  en?: TypesExperiences[];
};
