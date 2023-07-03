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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const admin_model_1 = require("./admin.model");
const jwtHalpers_1 = require("../../../helpers/jwtHalpers");
const config_1 = __importDefault(require("../../../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const createAdminService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield admin_model_1.Admin.findOne({ phoneNumber: payload.phoneNumber });
    if (isExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Your phone number is already used.");
    }
    const result = yield admin_model_1.Admin.create(payload);
    return result;
});
const loginAdminService = (loginData) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, password } = loginData;
    const isAdminExist = yield admin_model_1.Admin.findOne({ phoneNumber }, { _id: 1, phoneNumber: 1, password: 1, role: 1 }).lean();
    if (!isAdminExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Admin does not exist.");
    }
    const isPasswordMatched = yield bcrypt_1.default.compare(password, isAdminExist.password);
    if (isAdminExist.password && !isPasswordMatched) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Password is incorrect.");
    }
    //token generating
    const accessToken = jwtHalpers_1.jwtHelpers.createToken({ _id: isAdminExist === null || isAdminExist === void 0 ? void 0 : isAdminExist._id, role: isAdminExist.role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHalpers_1.jwtHelpers.createToken({ _id: isAdminExist === null || isAdminExist === void 0 ? void 0 : isAdminExist._id, role: isAdminExist.role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
exports.AdminService = {
    createAdminService,
    loginAdminService,
};
