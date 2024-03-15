/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder, Types } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IFramework, IFrameworkFilterRequest } from './framework.interface';
import { frameworkSearchableFields } from './framework.constant';
import { Framework } from './framework.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const createFramework = async (
  framework: IFramework,
): Promise<IFramework | null> => {
  const alreadyExist = await Framework.findOne({
    category: framework.category,
  });
  if (alreadyExist) {
    console.log('Already Added');
  } else {
    const result = await Framework.create(framework);
    return result;
  }
  return null;
};
const getAllFramework = async (
  filters: IFrameworkFilterRequest,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IFramework[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: frameworkSearchableFields.map(field => ({
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

  const result = await Framework.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Framework.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const getSingleFramework = async (id: string): Promise<IFramework | null> => {
  const result = await Framework.findOne({
    _id: new Types.ObjectId(id),
  });

  return result;
};
const deleteFramework = async (id: string): Promise<IFramework | null> => {
  // Check if the admin exists
  const isExist = await Framework.findOne({ _id: new Types.ObjectId(id) });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Donation was not found!');
  }

  // eslint-disable-next-line no-useless-catch
  try {
    // Delete the admin
    const result = await Framework.findOneAndDelete({
      _id: new Types.ObjectId(id),
    });

    return result;
  } catch (error: any) {
    // Handle errors appropriately
    throw error.message;
  }
};
const updateFramework = async (
  id: string,
  payload: Partial<IFramework>,
): Promise<IFramework | null> => {
  const result = await Framework.findOneAndUpdate(
    { _id: new Types.ObjectId(id) },
    payload,
    {
      new: true,
    },
  );
  return result;
};

const imageUpload = async (imageupload: any): Promise<any | null> => {
  const result = await Framework.create(imageupload);
  return result;
};
export const FrameworksService = {
  imageUpload,
  getAllFramework,
  createFramework,
  getSingleFramework,
  updateFramework,
  deleteFramework,
};
