import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { FrameworksService } from './framework.service';
import { IFramework } from './framework.interface';
import { frameworkFilterableFields } from './framework.constant';

const createFramework = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const result = await FrameworksService.createFramework(data);

  sendResponse<IFramework>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Framework created successfully',
    data: result,
  });
});
const getSingleFramework = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await FrameworksService.getSingleFramework(id);

  sendResponse<IFramework>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Framework fetched successfully !',
    data: result,
  });
});

const getAllFramework = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, frameworkFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await FrameworksService.getAllFramework(
    filters,
    paginationOptions,
  );

  sendResponse<IFramework[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Frameworks fetched successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const updateFramework = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await FrameworksService.updateFramework(id, data);

  sendResponse<IFramework>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Framewor updated successfully !',
    data: result,
  });
});

const deleteFramework = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await FrameworksService.deleteFramework(id);

  sendResponse<IFramework>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Framework deleted successfully !',
    data: result,
  });
});

export const FrameworksController = {
  createFramework,
  getAllFramework,
  getSingleFramework,
  updateFramework,
  deleteFramework,
};
