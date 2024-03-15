import { Model } from 'mongoose';
export type IProject = {
  image: string;
  name: string;
  title: string;
  frontend: string;
  backend: string;
  category: string;
  description: string;
  techonology: string;
  ownername: string;
  gitClient: string;
  gitServer: string;
  liveproject: string;
  liveServer: string;
  videoLink: string;
};

export type ProjectModel = Model<IProject, Record<string, unknown>>;

export type IProjectFilterRequest = {
  searchTerm?: string | undefined;
  name?: string;
  category?: string;
};
