import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { SkillService } from './skills.service';
//import { IFramework } from './skills.interface';
import { skillFilterableFields } from './skills.constant';
import { ISkill } from './skills.interface';

const createSkill = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const result = await SkillService.createSkill(data);
  console.log(req.headers.authorization);
  console.log(req.user);
  sendResponse<ISkill>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Skill created successfully',
    data: result,
  });
});
const getSingleSkill = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await SkillService.getSingleSkill(id);

  sendResponse<ISkill>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Skill fetched successfully !',
    data: result,
  });
});

const getAllSkill = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, skillFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await SkillService.getAllSkill(filters, paginationOptions);

  sendResponse<ISkill[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Skill fetched successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const updateSkill = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await SkillService.updateSkill(id, data);

  sendResponse<ISkill>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Skill updated successfully !',
    data: result,
  });
});

const deleteSkill = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await SkillService.deleteSkill(id);

  sendResponse<ISkill>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Skill deleted successfully !',
    data: result,
  });
});

export const SkillController = {
  createSkill,
  getAllSkill,
  getSingleSkill,
  updateSkill,
  deleteSkill,
};
