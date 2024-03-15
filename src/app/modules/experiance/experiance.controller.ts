import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { ExperianceService } from './experiance.service';
import { IExperiance } from './experiance.interface';
import { experianceFilterableFields } from './experiance.constant';

const createExperiance = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const result = await ExperianceService.createExperiance(data);

  sendResponse<IExperiance>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Experiance created successfully',
    data: result,
  });
});
const getSingleExperiance = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await ExperianceService.getSingleExperiance(id);

  sendResponse<IExperiance>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Experiance fetched successfully !',
    data: result,
  });
});

const getAllExperiance = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, experianceFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await ExperianceService.getAllExperiance(
    filters,
    paginationOptions,
  );

  sendResponse<IExperiance[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Experiance fetched successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const updateExperiance = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await ExperianceService.updateExperiance(id, data);

  sendResponse<IExperiance>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Experiance updated successfully !',
    data: result,
  });
});

const deleteExperiance = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await ExperianceService.deleteExperiance(id);

  sendResponse<IExperiance>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Experiance deleted successfully !',
    data: result,
  });
});

export const ExperianceController = {
  createExperiance,
  getSingleExperiance,
  getAllExperiance,
  updateExperiance,
  deleteExperiance,
};
