import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { ProjectService } from './project.service';
import { IProject } from './project.interface';
import { projectFilterableFields } from './project.constant';
// import { FrameworksService } from './framework.service';
// import { IFramework } from './framework.interface';
// import { frameworkFilterableFields } from './framework.constant';

const createProject = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const result = await ProjectService.createProject(data);

  sendResponse<IProject>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'created successfully',
    data: result,
  });
});
const getSingleProject = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await ProjectService.getSingleProject(id);

  sendResponse<IProject>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single fetched successfully !',
    data: result,
  });
});

const getAllProject = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, projectFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await ProjectService.getAllProject(filters, paginationOptions);

  sendResponse<IProject[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project fetched successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const updateProject = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await ProjectService.updateProject(id, data);

  sendResponse<IProject>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project updated successfully !',
    data: result,
  });
});

const deleteProject = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await ProjectService.deleteProject(id);

  sendResponse<IProject>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project deleted successfully !',
    data: result,
  });
});

export const ProjectController = {
  createProject,
  getAllProject,
  getSingleProject,
  updateProject,
  deleteProject,
};
