/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose, { SortOrder, Types } from 'mongoose';
import config from '../../../config/index';
import ApiError from '../../../errors/ApiError';
//import { IAdmin } from '../admin/admin.interface';
//import { Admin } from '../admin/admin.model';

import { IUser } from './user.interface';
import { User } from './user.model';
import { generateUserId } from './user.utils';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { userSearchableFields } from './user.constant';
import { sendEmail } from '../auth/sendResetMail';
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
    newUserAllData = await User.findOne({ email: newUserAllData.id });
  }
  return newUserAllData;
};
const getSingleUsers = async (id: string): Promise<IUser | null> => {
  const result = await User.findOne({ _id: new Types.ObjectId(id) });

  return result;
};
const getAllUsers = async (
  filters: IUser,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IUser[]>> => {
  //Extract searchTerm to implement search query
  //@ts-ignore
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: userSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  // Filters needs $and to fullfill all the conditions
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // Dynamic sort needs  fields to  do sorting
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  // If there is no condition , put {} to give all data
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await User.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const updateUser = async (
  id: string,
  payload: Partial<IUser>,
): Promise<IUser | null> => {
  const result = await User.findOneAndUpdate(
    { _id: new Types.ObjectId(id) },
    payload,
    {
      new: true,
    },
  );
  return result;
};
type IContact = {
  name: string;
  email: string;
  description: string;
};
const createContact = async (contact: IContact) => {
  await sendEmail(
    `${process.env.EMAIL}`,
    `
      <div>
        <p>User Name, ${contact.name}</p>
        <p>User Mail, ${contact.email}</p>
        <p>Description:, ${contact.description}</p>
        <p>Thank you</p>
      </div>
  `,
  );
};
export const UserService = {
  createUser,
  getSingleUsers,
  getAllUsers,
  updateUser,
  createContact,
};
