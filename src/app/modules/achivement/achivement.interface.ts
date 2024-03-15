import { Model } from 'mongoose';
export type IAchivement = {
  date?: string;
  category?: string;
  certificate?: string;
  description?: string;
  get?: string;
};

export type AchivementModel = Model<IAchivement, Record<string, unknown>>;

export type IAchivementFilterRequest = {
  searchTerm?: string | undefined;
  category?: string;
};
