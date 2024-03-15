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
exports.AchivementService = void 0;
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = require("mongoose");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const achivement_constant_1 = require("./achivement.constant");
const achivement_model_1 = require("./achivement.model");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const createAchivement = (achivement) => __awaiter(void 0, void 0, void 0, function* () {
    const alreadyExist = yield achivement_model_1.Achivement.findOne({
        category: achivement.category,
    });
    if (alreadyExist) {
        console.log('Already Added');
    }
    else {
        const result = yield achivement_model_1.Achivement.create(achivement);
        return result;
    }
    return null;
});
const getAllAchivement = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    // Search needs $or for searching in specified fields
    if (searchTerm) {
        andConditions.push({
            $or: achivement_constant_1.achivementSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    // Filters needs $and to fullfill all the conditions
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    // Dynamic sort needs  fields to  do sorting
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    // If there is no condition , put {} to give all data
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield achivement_model_1.Achivement.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield achivement_model_1.Achivement.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleAchivement = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield achivement_model_1.Achivement.findOne({
        _id: new mongoose_1.Types.ObjectId(id),
    });
    return result;
});
const deleteAchivement = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the admin exists
    const isExist = yield achivement_model_1.Achivement.findOne({ _id: new mongoose_1.Types.ObjectId(id) });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Data was not found!');
    }
    // eslint-disable-next-line no-useless-catch
    try {
        // Delete the admin
        const result = yield achivement_model_1.Achivement.findOneAndDelete({
            _id: new mongoose_1.Types.ObjectId(id),
        });
        return result;
    }
    catch (error) {
        // Handle errors appropriately
        throw error.message;
    }
});
const updateAchivement = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield achivement_model_1.Achivement.findOneAndUpdate({ _id: new mongoose_1.Types.ObjectId(id) }, payload, {
        new: true,
    });
    return result;
});
// const imageUpload = async (imageupload: any): Promise<any | null> => {
//   const result = await Framework.create(imageupload);
//   return result;
// };
exports.AchivementService = {
    // imageUpload,
    getAllAchivement,
    createAchivement,
    getSingleAchivement,
    updateAchivement,
    deleteAchivement,
};
