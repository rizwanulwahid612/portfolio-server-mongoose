/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder, Types } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
//import { IFramework, IFrameworkFilterRequest } from './framework.interface';
//import { frameworkSearchableFields } from './framework.constant';
//import { Framework } from './framework.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { IProject, IProjectFilterRequest } from './project.interface';
import { Project } from './project.model';
import { projectkSearchableFields } from './project.constant';
// import ApiError from '../../../errors/ApiError';
// import httpStatus from 'http-status';

const createProject = async (project: IProject): Promise<IProject | null> => {
  const alreadyExist = await Project.findOne({
    name: project.name,
  });
  if (alreadyExist) {
    console.log('Already Added');
  } else {
    const result = await Project.create(project);
    return result;
  }
  return null;
};
const getAllProject = async (
  filters: IProjectFilterRequest,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IProject[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: projectkSearchableFields.map(field => ({
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

  const result = await Project.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Project.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const getSingleProject = async (id: string): Promise<IProject | null> => {
  const result = await Project.findOne({ _id: new Types.ObjectId(id) });

  return result;
};
const deleteProject = async (id: string): Promise<IProject | null> => {
  // Check if the admin exists
  const isExist = await Project.findOne({ _id: new Types.ObjectId(id) });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'project did not found!');
  }

  // eslint-disable-next-line no-useless-catch
  try {
    // Delete the admin
    const result = await Project.findOneAndDelete({
      _id: new Types.ObjectId(id),
    });

    return result;
  } catch (error: any) {
    // Handle errors appropriately
    throw error.message;
  }
};
const updateProject = async (
  id: string,
  payload: Partial<IProject>,
): Promise<IProject | null> => {
  const result = await Project.findOneAndUpdate(
    { _id: new Types.ObjectId(id) },
    payload,
    {
      new: true,
    },
  );
  return result;
};
export const ProjectService = {
  getAllProject,
  createProject,
  getSingleProject,
  updateProject,
  deleteProject,
};
