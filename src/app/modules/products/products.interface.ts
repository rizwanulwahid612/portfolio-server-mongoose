import { Model } from 'mongoose';
export type IProduct = {
  image: string;
  name: string;
  price: string;
  occation: string;
  recipient: string;
  category: string;
  theme: string;
  brand: string;
  color: string;
};

export type ProductsModel = Model<IProduct, Record<string, unknown>>;

export type IProductFilterRequest = {
  searchTerm?: string | undefined;
  name?: string;
  category?: string;
};
