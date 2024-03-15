"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExperianceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const experiance_controller_1 = require("./experiance.controller");
//import { ENUM_USER_ROLE } from '../../../enums/user';
//import auth from '../../middlewares/auth';
//import validateRequest from '../../middlewares/validateRequest';
// import { CategoryController } from './category.controller';
// import { CategoryValidation } from './category.validation';
// import { ServiceController } from './service.controller';
// import { ServiceValidation } from './service.validation';
const router = express_1.default.Router();
router.post('/create-achivement', 
// validateRequest(CategoryValidation.postCategory),
// auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
experiance_controller_1.ExperianceController.createExperiance);
router.get('/:id', 
// auth(
//   ENUM_USER_ROLE.SUPER_ADMIN,
//   ENUM_USER_ROLE.ADMIN,
//   ENUM_USER_ROLE.CUSTOMER,
// ),
experiance_controller_1.ExperianceController.getSingleExperiance);
router.get('/', 
// auth(
//   ENUM_USER_ROLE.SUPER_ADMIN,
//   ENUM_USER_ROLE.ADMIN,
//   ENUM_USER_ROLE.CUSTOMER,
// ),
experiance_controller_1.ExperianceController.getAllExperiance);
router.patch('/:id', 
// validateRequest(CategoryValidation.updateCategory),
// auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
experiance_controller_1.ExperianceController.updateExperiance);
router.delete('/:id', 
// auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
experiance_controller_1.ExperianceController.deleteExperiance);
exports.ExperianceRoutes = router;
