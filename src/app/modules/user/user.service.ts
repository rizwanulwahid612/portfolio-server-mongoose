/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import config from '../../../config/index';
import ApiError from '../../../errors/ApiError';
//import { IAdmin } from '../admin/admin.interface';
//import { Admin } from '../admin/admin.model';

import { IUser } from './user.interface';
import { User } from './user.model';
import { generateUserId } from './user.utils';
//import { generateAdminId } from './user.utils';

const createUser = async (user: IUser): Promise<IUser | null> => {
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User data is missing');
  }
  if (!user.password) {
    user.password = config.default_user_pass as string;
  }
  user.role = 'user';

  // generate admin id
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const id = await generateUserId();
    user.id = id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    newUserAllData = newUser[0]._id;

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id });
  }
  return newUserAllData;
};

export const UserService = {
  createUser,
};
