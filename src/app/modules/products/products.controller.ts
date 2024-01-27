import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { ProductsService } from './products.service';
import { IProduct } from './products.interface';
import { productFilterableFields } from './products.constant';
// import { CategoryService } from './category.service';
// import { ICategory } from './category.interface';
// import { categoryFilterableFields } from './category.constant';

// const createCategory = catchAsync(async (req: Request, res: Response) => {
//   const { ...categoryData } = req.body;
//   const result = await CategoryService.createCategory(categoryData);

//   sendResponse<ICategory>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Category created successfully',
//     data: result,
//   });
// });
// const getSingleCategory = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;
//   const result = await CategoryService.getSingleCategory(id);

//   sendResponse<ICategory>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Category fetched successfully !',
//     data: result,
//   });
// });

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, productFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await ProductsService.getAllProducts(
    filters,
    paginationOptions,
  );

  sendResponse<IProduct[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Products fetched successfully !',
    meta: result.meta,
    data: result.data,
  });
});

// const updateCategory = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;
//   const updatedData = req.body;

//   const result = await CategoryService.updateCategory(id, updatedData);

//   sendResponse<ICategory>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Category updated successfully !',
//     data: result,
//   });
// });

// const deleteCategory = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;
//   const result = await CategoryService.deletecategory(id);

//   sendResponse<ICategory>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Category deleted successfully !',
//     data: result,
//   });
// });

export const ProductsController = {
  //createCategory,
  //getSingleCategory,
  getAllProducts,
  //updateCategory,
  //deleteCategory,
};
