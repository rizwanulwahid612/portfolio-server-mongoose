"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrameworksRoutes = void 0;
const express_1 = __importDefault(require("express"));
const framework_controller_1 = require("./framework.controller");
//import { ENUM_USER_ROLE } from '../../../enums/user';
//import auth from '../../middlewares/auth';
//import validateRequest from '../../middlewares/validateRequest';
// import { CategoryController } from './category.controller';
// import { CategoryValidation } from './category.validation';
// import { ServiceController } from './service.controller';
// import { ServiceValidation } from './service.validation';
const router = express_1.default.Router();
router.post('/create-framework', 
// validateRequest(CategoryValidation.postCategory),
// auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
framework_controller_1.FrameworksController.createFramework);
router.get('/:id', 
// auth(
//   ENUM_USER_ROLE.SUPER_ADMIN,
//   ENUM_USER_ROLE.ADMIN,
//   ENUM_USER_ROLE.CUSTOMER,
// ),
framework_controller_1.FrameworksController.getSingleFramework);
router.get('/', 
// auth(
//   ENUM_USER_ROLE.SUPER_ADMIN,
//   ENUM_USER_ROLE.ADMIN,
//   ENUM_USER_ROLE.CUSTOMER,
// ),
framework_controller_1.FrameworksController.getAllFramework);
router.patch('/:id', 
// validateRequest(CategoryValidation.updateCategory),
// auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
framework_controller_1.FrameworksController.updateFramework);
router.delete('/:id', 
// auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
framework_controller_1.FrameworksController.deleteFramework);
exports.FrameworksRoutes = router;
