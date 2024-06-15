"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const config_1 = __importDefault(require("../../../config"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const auth_service_1 = require("./auth.service");
const loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loginData = __rest(req.body, []);
    const result = yield auth_service_1.AuthService.loginUser(loginData);
    const { refreshToken } = result;
    // set refresh token into cookie
    const cookieOptions = {
        secure: config_1.default.env === 'production',
        httpOnly: true,
        // httpOnly: false,
    };
    res.cookie('refreshToken', refreshToken, cookieOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'User logged in successfully !',
        data: result,
    });
}));
const refreshToken = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    const result = yield auth_service_1.AuthService.refreshToken(refreshToken);
    // // set refresh token into cookie
    // const cookieOptions = {
    //   secure: config.env === 'production',
    //   httpOnly: true,
    // };
    // res.cookie('refreshToken', refreshToken, cookieOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'User logged in successfully !',
        data: result,
    });
}));
const changePassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    const passwordData = __rest(req.body, []);
    yield auth_service_1.AuthService.changePassword(user, passwordData);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Password changed successfully !',
    });
}));
const forgotPass = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield auth_service_1.AuthService.forgotPass(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Check your email!',
    });
}));
//original
// const forgotPass = catchAsync(async (req: Request, res: Response) => {
//   await AuthService.forgotPass(req.body);
//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: 'Check your email!',
//   });
// });
const resetPassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization || '';
    // await AuthService.resetPassword(req.body, token);
    console.log(req.body, token);
    yield auth_service_1.AuthService.resetPassword(req.body, token);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Account recovered!',
    });
}));
//original
// const resetPassword = catchAsync(async (req: Request, res: Response) => {
//   //const token = req.headers.authorization || '';
//   // await AuthService.resetPassword(req.body, token);
//   await AuthService.resetPassword(req.body);
//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: 'Account recovered!',
//   });
// });
exports.AuthController = {
    loginUser,
    refreshToken,
    changePassword,
    forgotPass,
    resetPassword,
};
// import { Request, Response } from 'express';
// import config from '../../../config';
// import catchAsync from '../../../shared/catchAsync';
// import sendResponse from '../../../shared/sendResponse';
// import { ILoginUserResponse, IRefreshTokenResponse } from './auth.interface';
// import { AuthService } from './auth.service';
// const loginUser = catchAsync(async (req: Request, res: Response) => {
//   const { ...loginData } = req.body;
//   const result = await AuthService.loginUser(loginData);
//   const { refreshToken } = result;
//   // set refresh token into cookie
//   const cookieOptions = {
//     secure: config.env === 'production',
//     httpOnly: true,
//   };
//   res.cookie('refreshToken', refreshToken, cookieOptions);
//   sendResponse<ILoginUserResponse>(res, {
//     statusCode: 200,
//     success: true,
//     message: 'User logged in successfully !',
//     data: result,
//   });
// });
// const refreshToken = catchAsync(async (req: Request, res: Response) => {
//   const { refreshToken } = req.cookies;
//   const result = await AuthService.refreshToken(refreshToken);
//   sendResponse<IRefreshTokenResponse>(res, {
//     statusCode: 200,
//     success: true,
//     message: 'User logged in successfully !',
//     data: result,
//   });
// });
// const changePassword = catchAsync(async (req: Request, res: Response) => {
//   const user = req.user;
//   const { ...passwordData } = req.body;
//   await AuthService.changePassword(user, passwordData);
//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: 'Password changed successfully !',
//   });
// });
// export const AuthController = {
//   loginUser,
//   refreshToken,
//   changePassword,
// };
