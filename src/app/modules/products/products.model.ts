import { Schema, model } from 'mongoose';
import { IProduct, ProductsModel } from './products.interface';

const ProductsSchema = new Schema<IProduct, ProductsModel>(
  {
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
    },
    occation: {
      type: String,
      required: true,
    },
    recipient: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    theme: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Products = model<IProduct, ProductsModel>(
  'Products',
  ProductsSchema,
);
