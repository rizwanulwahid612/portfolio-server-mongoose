/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
//import { IAdmin } from '../admin/admin.interface';
//import { ICustomer } from '../customer/customer.interface';

export type IUser = {
  id: string;
  role: string;
  email: string;
  name: string;
  image: string;
  password: string;
  needsPasswordChange: true | false;
};

export type UserModel = {
  isUserExist(
    id: string,
  ): Promise<
    Pick<
      IUser,
      | 'id'
      | 'password'
      | 'role'
      | 'needsPasswordChange'
      | 'email'
      | 'image'
      | 'name'
    >
  >;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>;
} & Model<IUser>;
