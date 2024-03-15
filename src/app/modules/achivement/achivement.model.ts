import { Schema, model } from 'mongoose';
import { AchivementModel, IAchivement } from './achivement.interface';

const AchivementSchema = new Schema<IAchivement, AchivementModel>(
  {
    date: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    certificate: {
      type: String,
      required: false,
    },
    get: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Achivement = model<IAchivement, AchivementModel>(
  'Achivement',
  AchivementSchema,
);
