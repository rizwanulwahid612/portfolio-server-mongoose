import { Schema, model } from 'mongoose';
import { ExperianceModel, IExperiance } from './experiance.interface';

const ExperianceSchema = new Schema<IExperiance, ExperianceModel>(
  {
    title: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    startdate: {
      type: String,
      required: false,
    },
    enddate: {
      type: String,
      required: false,
    },
    present: {
      type: String,
      required: false,
    },
    company: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Experiance = model<IExperiance, ExperianceModel>(
  'Experiance',
  ExperianceSchema,
);
