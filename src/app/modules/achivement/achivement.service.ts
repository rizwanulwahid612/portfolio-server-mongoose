/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder, Types } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IAchivement, IAchivementFilterRequest } from './achivement.interface';
import { achivementSearchableFields } from './achivement.constant';
import { Achivement } from './achivement.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const createAchivement = async (
  achivement: IAchivement,
): Promise<IAchivement | null> => {
  const alreadyExist = await Achivement.findOne({
    category: achivement.category,
  });
  if (alreadyExist) {
    console.log('Already Added');
  } else {
    const result = await Achivement.create(achivement);
    return result;
  }
  return null;
};
const getAllAchivement = async (
  filters: IAchivementFilterRequest,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IAchivement[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: achivementSearchableFields.map(field => ({
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

  const result = await Achivement.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Achivement.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const getSingleAchivement = async (id: string): Promise<IAchivement | null> => {
  const result = await Achivement.findOne({
    _id: new Types.ObjectId(id),
  });

  return result;
};
const deleteAchivement = async (id: string): Promise<IAchivement | null> => {
  // Check if the admin exists
  const isExist = await Achivement.findOne({ _id: new Types.ObjectId(id) });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Data was not found!');
  }

  // eslint-disable-next-line no-useless-catch
  try {
    // Delete the admin
    const result = await Achivement.findOneAndDelete({
      _id: new Types.ObjectId(id),
    });

    return result;
  } catch (error: any) {
    // Handle errors appropriately
    throw error.message;
  }
};
const updateAchivement = async (
  id: string,
  payload: Partial<IAchivement>,
): Promise<IAchivement | null> => {
  const result = await Achivement.findOneAndUpdate(
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
export const AchivementService = {
  // imageUpload,
  getAllAchivement,
  createAchivement,
  getSingleAchivement,
  updateAchivement,
  deleteAchivement,
};
