import { Schema, model } from 'mongoose';
import { ISkill, SkillModel } from './skills.interface';

const SkillSchema = new Schema<ISkill, SkillModel>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Skill = model<ISkill, SkillModel>('Skill', SkillSchema);
