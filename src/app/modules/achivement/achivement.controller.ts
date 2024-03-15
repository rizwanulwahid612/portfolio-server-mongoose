import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { AchivementService } from './achivement.service';
import { IAchivement } from './achivement.interface';
import { achivementFilterableFields } from './achivement.constant';

const createAchivement = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const result = await AchivementService.createAchivement(data);

  sendResponse<IAchivement>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Achivement created successfully',
    data: result,
  });
});
const getSingleAchivement = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AchivementService.getSingleAchivement(id);

  sendResponse<IAchivement>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Achivement fetched successfully !',
    data: result,
  });
});

const getAllAchivement = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, achivementFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await AchivementService.getAllAchivement(
    filters,
    paginationOptions,
  );

  sendResponse<IAchivement[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Achivement fetched successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const updateAchivement = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await AchivementService.updateAchivement(id, data);

  sendResponse<IAchivement>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Achivement updated successfully !',
    data: result,
  });
});

const deleteAchivement = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AchivementService.deleteAchivement(id);

  sendResponse<IAchivement>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Achivement deleted successfully !',
    data: result,
  });
});

export const AchivementController = {
  createAchivement,
  getSingleAchivement,
  getAllAchivement,
  updateAchivement,
  deleteAchivement,
};
