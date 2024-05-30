/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
//import { IAdmin } from '../admin/admin.interface';
//import { ICustomer } from '../customer/customer.interface';
export type Iimgs = {
  imgs?: string;
  public_id?: string;
  secure_url?: string;
};
export type IUser = {
  id: string;
  role: string;
  email: string;
  name: string;
  title: string;
  discord?: string;
  facebook?: string;
  youtube?: string;
  instagram?: string;
  tools?: string;
  skills?: string;
  language?: string;
  birth?: string;
  ssc?: string;
  hsc?: string;
  masters?: string;
  phd?: string;
  extracurriculam?: string;
  blood?: string;
  institute: string;
  degree: string;
  passingyear?: string;
  fathersname?: string;
  mothersname?: string;
  height?: string;
  weight?: string;
  frontend?: string;
  backend?: string;
  linkedin?: string;
  whatsapp?: string;
  twitter?: string;
  github?: string;
  website?: string;
  imagess?: Iimgs[];
  //image?: string;
  aboutme?: string;
  marriedstatus?: string;
  nid?: string;
  experience1?: string;
  experience2?: string;
  experience3?: string;
  experience4?: string;
  experience5?: string;
  experience6?: string;
  experience7?: string;
  experience8?: string;
  experience9?: string;
  experience10?: string;
  presentaddress?: string;
  parmanentaddress?: string;
  achivement?: string;
  contact?: string;
  gender?: string;
  password: string;
  needsPasswordChange: true | false;
  cv?: string;
  resume?: string;
  features?: string;
  framework?: string;
  technologyFor?: string;
  trainningcenter?: string;
  front?: string;
  back?: string;
  tool?: string;
};

export type UserModel = {
  isUserExist(
    email: string,
  ): Promise<
    Pick<
      IUser,
      | 'id'
      | 'password'
      | 'role'
      | 'needsPasswordChange'
      | 'email'
      | 'name'
      | 'imagess'
      | 'aboutme'
      | 'achivement'
      | 'backend'
      | 'birth'
      | 'blood'
      | 'contact'
      | 'degree'
      | 'experience1'
      | 'experience2'
      | 'experience3'
      | 'experience4'
      | 'experience5'
      | 'experience6'
      | 'experience7'
      | 'experience8'
      | 'experience9'
      | 'experience10'
      | 'extracurriculam'
      | 'fathersname'
      | 'frontend'
      | 'github'
      | 'height'
      | 'hsc'
      | 'institute'
      | 'linkedin'
      | 'marriedstatus'
      | 'masters'
      | 'mothersname'
      | 'nid'
      | 'parmanentaddress'
      | 'passingyear'
      | 'phd'
      | 'presentaddress'
      | 'skills'
      | 'ssc'
      | 'title'
      | 'website'
      | 'weight'
      | 'whatsapp'
      | 'gender'
      | 'language'
      | 'facebook'
      | 'instagram'
      | 'tools'
      | 'youtube'
      | 'discord'
      | 'twitter'
      | 'back'
      | 'cv'
      | 'features'
      | 'framework'
      | 'front'
      | 'resume'
      | 'technologyFor'
      | 'tool'
      | 'trainningcenter'
    >
  >;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>;
} & Model<IUser>;
