/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../../config';
import { IUser, UserModel } from './user.interface';

const UserSchema = new Schema<IUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    facebook: {
      type: String,
      required: false,
    },
    youtube: {
      type: String,
      required: false,
    },
    instagram: {
      type: String,
      required: false,
    },
    tools: {
      type: String,
      required: false,
    },
    language: {
      type: String,
      required: false,
    },
    discord: {
      type: String,
      required: false,
    },
    skills: {
      type: String,
      required: false,
    },
    birth: {
      type: String,
      required: false,
    },
    marriedstatus: {
      type: String,
      required: false,
    },
    nid: {
      type: String,
      required: false,
    },
    ssc: {
      type: String,
      required: false,
    },
    hsc: {
      type: String,
      required: false,
    },
    masters: {
      type: String,
      required: false,
    },
    phd: {
      type: String,
      required: false,
    },
    passingyear: {
      type: String,
      required: false,
    },
    fathersname: {
      type: String,
      required: false,
    },
    mothersname: {
      type: String,
      required: false,
    },
    height: {
      type: String,
      required: false,
    },
    weight: {
      type: String,
      required: false,
    },
    experience1: {
      type: String,
      required: false,
    },
    experience2: {
      type: String,
      required: false,
    },
    experience3: {
      type: String,
      required: false,
    },
    experience4: {
      type: String,
      required: false,
    },
    experience5: {
      type: String,
      required: false,
    },
    experience6: {
      type: String,
      required: false,
    },
    experience7: {
      type: String,
      required: false,
    },
    experience8: {
      type: String,
      required: false,
    },
    experience9: {
      type: String,
      required: false,
    },
    experience10: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    aboutme: {
      type: String,
      required: true,
    },
    presentaddress: {
      type: String,
      required: true,
    },
    parmanentaddress: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
    github: {
      type: String,
      required: true,
    },
    whatsapp: {
      type: String,
      required: true,
    },
    linkedin: {
      type: String,
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
    institute: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    frontend: {
      type: String,
      required: true,
    },
    backend: {
      type: String,
      required: true,
    },
    achivement: {
      type: String,
      required: false,
    },
    contact: {
      type: String,
      required: true,
    },
    extracurriculam: {
      type: String,
      required: false,
    },
    blood: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      required: false,
    },
    twitter: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

UserSchema.statics.isUserExist = async function (
  //id: string,
  email: string,
): Promise<Pick<
  IUser,
  | 'id'
  | 'email'
  | 'password'
  | 'role'
  | 'needsPasswordChange'
  | 'image'
  | 'name'
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
  | 'fathersname'
  | 'mothersname'
  | 'height'
  | 'weight'
  | 'passingyear'
  | 'aboutme'
  | 'presentaddress'
  | 'parmanentaddress'
  | 'achivement'
  | 'contact'
  | 'title'
  | 'institute'
  | 'degree'
  | 'frontend'
  | 'backend'
  | 'linkedin'
  | 'whatsapp'
  | 'github'
  | 'website'
  | 'birth'
  | 'blood'
  | 'extracurriculam'
  | 'hsc'
  | 'masters'
  | 'phd'
  | 'ssc'
  | 'marriedstatus'
  | 'nid'
  | 'skills'
  | 'gender'
  | 'language'
  | 'facebook'
  | 'instagram'
  | 'tools'
  | 'youtube'
  | 'discord'
  | 'twitter'
> | null> {
  return await User.findOne(
    { email },
    {
      id: 1,
      email: 1,
      password: 1,
      role: 1,
      needsPasswordChange: 1,
      image: 1,
      name: 1,
      aboutme: 1,
      presentaddress: 1,
      parmanentaddress: 1,
      achivement: 1,
      contact: 1,
      title: 1,
      institute: 1,
      degree: 1,
      frontend: 1,
      backend: 1,
      linkedin: 1,
      whatsapp: 1,
      github: 1,
      website: 1,
      birth: 1,
      blood: 1,
      experience1: 1,
      experience2: 1,
      experience3: 1,
      experience4: 1,
      experience5: 1,
      experience6: 1,
      experience7: 1,
      experience8: 1,
      experience9: 1,
      experience10: 1,
      extracurriculam: 1,
      fathersname: 1,
      gender: 1,
      height: 1,
      hsc: 1,
      marriedstatus: 1,
      masters: 1,
      mothersname: 1,
      nid: 1,
      passingyear: 1,
      phd: 1,
      skills: 1,
      ssc: 1,
      weigth: 1,
      language: 1,
      facebook: 1,
      instagram: 1,
      tools: 1,
      weight: 1,
      youtube: 1,
      discord: 1,
      twitter: 1,
    },
  );
};

UserSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

// User.create() / user.save()
UserSchema.pre('save', async function (next) {
  // hashing user password
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bycrypt_salt_rounds),
  );
  next();
});

export const User = model<IUser, UserModel>('User', UserSchema);
