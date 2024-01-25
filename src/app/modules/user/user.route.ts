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
  '/create-user',
  //validateRequest(UserValidation.createUserZodSchema),
  //auth(ENUM_USER_ROLE.USER),
  UserController.createUser,
);

export const UserRoutes = router;
