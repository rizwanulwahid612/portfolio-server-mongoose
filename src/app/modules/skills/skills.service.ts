/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder, Types } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { ISkill, ISkillFilterRequest } from './skills.interface';

import { Skill } from './skills.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { skillSearchableFields } from './skills.constant';

const createSkill = async (skill: ISkill): Promise<ISkill | null> => {
  const alreadyExist = await Skill.findOne({
    name: skill.name,
  });
  if (alreadyExist) {
    console.log('Already Added');
  } else {
    const result = await Skill.create(skill);
    return result;
  }
  return null;
};
const getAllSkill = async (
  filters: ISkillFilterRequest,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<ISkill[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: skillSearchableFields.map(field => ({
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

  const result = await Skill.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Skill.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const getSingleSkill = async (id: string): Promise<ISkill | null> => {
  const result = await Skill.findOne({
    _id: new Types.ObjectId(id),
  });

  return result;
};
const deleteSkill = async (id: string): Promise<ISkill | null> => {
  // Check if the admin exists
  const isExist = await Skill.findOne({ _id: new Types.ObjectId(id) });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Skill was not found!');
  }

  // eslint-disable-next-line no-useless-catch
  try {
    // Delete the admin
    const result = await Skill.findOneAndDelete({
      _id: new Types.ObjectId(id),
    });

    return result;
  } catch (error: any) {
    // Handle errors appropriately
    throw error.message;
  }
};
const updateSkill = async (
  id: string,
  payload: Partial<ISkill>,
): Promise<ISkill | null> => {
  const result = await Skill.findOneAndUpdate(
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
export const SkillService = {
  // imageUpload,
  getAllSkill,
  createSkill,
  getSingleSkill,
  updateSkill,
  deleteSkill,
};
