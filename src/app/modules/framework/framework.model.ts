import { Schema, model } from 'mongoose';
import { FrameworkModel, IFramework } from './framework.interface';

const FrameworkSchema = new Schema<IFramework, FrameworkModel>(
  {
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    rating: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Framework = model<IFramework, FrameworkModel>(
  'Frameworks',
  FrameworkSchema,
);
