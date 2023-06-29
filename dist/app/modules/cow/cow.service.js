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
exports.CowService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = require("../user/user.model");
const cow_model_1 = require("./cow.model");
const cow_constant_1 = require("./cow.constant");
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const createCowService = (cowData) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_model_1.User.findById(cowData.seller);
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Please give me seller id as seller.");
    }
    const result = yield cow_model_1.Cow.create(cowData);
    return result;
});
const getAllCowsService = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, minPrice, maxPrice } = filters, filtersData = __rest(filters, ["searchTerm", "minPrice", "maxPrice"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: cow_constant_1.cowSearchableFields.map((field) => ({
                [field]: {
                    $regex: searchTerm,
                    $options: "i",
                },
            })),
        });
    }
    if (minPrice && !maxPrice) {
        andConditions.push({
            $and: [{ price: { $gte: Number(minPrice) } }],
        });
    }
    if (!minPrice && maxPrice) {
        andConditions.push({
            $and: [{ price: { $lte: Number(maxPrice) } }],
        });
    }
    if (minPrice && maxPrice) {
        andConditions.push({
            $and: [{ price: { $gte: Number(minPrice), $lte: Number(maxPrice) } }],
        });
    }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const { page, limit, skip, sortBy, sortOrder } = paginationHelpers_1.paginationHelpers.calculatePagination(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const total = yield cow_model_1.Cow.countDocuments();
    const result = yield cow_model_1.Cow.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleCowService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.Cow.findById(id);
    return result;
});
const updateCowService = (id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.Cow.findOneAndUpdate({ _id: id }, updatedData, {
        new: true,
    });
    return result;
});
const deleteCowService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.Cow.findByIdAndDelete(id);
    return result;
});
exports.CowService = {
    createCowService,
    getAllCowsService,
    getSingleCowService,
    updateCowService,
    deleteCowService,
};
