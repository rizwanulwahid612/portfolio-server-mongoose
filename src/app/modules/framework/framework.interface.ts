import { Model } from 'mongoose';
export type IFramework = {
  image: string;
  category: string;
  description: string;
  rating: string;
};

export type FrameworkModel = Model<IFramework, Record<string, unknown>>;

export type IFrameworkFilterRequest = {
  searchTerm?: string | undefined;
  category?: string;
};
