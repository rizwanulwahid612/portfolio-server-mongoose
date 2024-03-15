import express from 'express';
//import validateRequest from '../../middlewares/validateRequest';
//import { UserValidation } from './user.validation';
import { UserController } from './user.controller';
//import auth from '../../middlewares/auth';
//import { ENUM_USER_ROLE } from '../../../enums/user';
//import { ENUM_USER_ROLE } from '../../../enums/user';
//import auth from '../../middlewares/auth';
const router = express.Router();

router.post(
  '/create-contact',
  //validateRequest(UserValidation.createUserZodSchema),
  //auth(ENUM_USER_ROLE.USER),
  UserController.createContact,
);
router.post(
  '/create-user',
  //validateRequest(UserValidation.createUserZodSchema),
  //auth(ENUM_USER_ROLE.USER),
  UserController.createUser,
);
router.get(
  '/',
  //auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.getAllUsers,
);
router.get(
  '/:id',
  //auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.getSingleUser,
);
router.patch(
  '/:id',
  // validateRequest(CategoryValidation.updateCategory),
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.updateUser,
);
export const UserRoutes = router;
