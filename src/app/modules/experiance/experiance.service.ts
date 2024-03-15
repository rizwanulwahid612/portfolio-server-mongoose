/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder, Types } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';

import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { IExperiance, IExperianceFilterRequest } from './experiance.interface';
import { Experiance } from './experiance.model';
import { experianceSearchableFields } from './experiance.constant';

const createExperiance = async (
  experiance: IExperiance,
): Promise<IExperiance | null> => {
  const alreadyExist = await Experiance.findOne({
    company: experiance.company,
  });
  if (alreadyExist) {
    console.log('Already Added');
  } else {
    const result = await Experiance.create(experiance);
    return result;
  }
  return null;
};
const getAllExperiance = async (
  filters: IExperianceFilterRequest,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IExperiance[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: experianceSearchableFields.map(field => ({
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

  const result = await Experiance.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Experiance.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const getSingleExperiance = async (id: string): Promise<IExperiance | null> => {
  const result = await Experiance.findOne({
    _id: new Types.ObjectId(id),
  });

  return result;
};
const deleteExperiance = async (id: string): Promise<IExperiance | null> => {
  // Check if the admin exists
  const isExist = await Experiance.findOne({ _id: new Types.ObjectId(id) });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Experiance was not found!');
  }

  // eslint-disable-next-line no-useless-catch
  try {
    // Delete the admin
    const result = await Experiance.findOneAndDelete({
      _id: new Types.ObjectId(id),
    });

    return result;
  } catch (error: any) {
    // Handle errors appropriately
    throw error.message;
  }
};
const updateExperiance = async (
  id: string,
  payload: Partial<IExperiance>,
): Promise<IExperiance | null> => {
  const result = await Experiance.findOneAndUpdate(
    { _id: new Types.ObjectId(id) },
    payload,
    {
      new: true,
    },
  );
  return result;
};

// const imageUpload = async (imageupload: any): Promise<any | null> => {
//   const result = await Framework.create(imageupload);
//   return result;
// };
export const ExperianceService = {
  //imageUpload,
  getAllExperiance,
  createExperiance,
  getSingleExperiance,
  updateExperiance,
  deleteExperiance,
};
