import { Model } from 'mongoose';
export type ISkill = {
  name: string;
};

export type SkillModel = Model<ISkill, Record<string, unknown>>;

export type ISkillFilterRequest = {
  searchTerm?: string | undefined;
  name?: string;
};
