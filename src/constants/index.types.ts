/** @format */

export type TypesProjects = {
  id: number;
  name: string;
  description: string;
  images: string[];
  tags: string[];
  link: string | null;
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
