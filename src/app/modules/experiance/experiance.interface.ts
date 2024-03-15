import { Model } from 'mongoose';
export type IExperiance = {
  title?: string;
  description?: string;
  startdate?: string;
  enddate?: string;
  present?: string;
  company?: string;
};

export type ExperianceModel = Model<IExperiance, Record<string, unknown>>;

export type IExperianceFilterRequest = {
  searchTerm?: string | undefined;
  title?: string;
};
