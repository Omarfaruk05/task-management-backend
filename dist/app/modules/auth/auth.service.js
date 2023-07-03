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
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = require("../user/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwtHalpers_1 = require("../../../helpers/jwtHalpers");
const config_1 = __importDefault(require("../../../config"));
const admin_model_1 = require("../admin/admin.model");
const createUserService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.role === "buyer") {
        payload.income = 0;
        if (!payload.budget) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "As a buyer you have to budget.");
        }
    }
    if (payload.role === "seller") {
        payload.budget = 0;
        payload.income = 0;
    }
    const isExist = yield user_model_1.User.findOne({ phoneNumber: payload.phoneNumber });
    if (isExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Your phone number is already used.");
    }
    const result = yield user_model_1.User.create(payload);
    return result;
});
const loginUserService = (loginData) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, password } = loginData;
    const isUserExist = yield user_model_1.User.findOne({ phoneNumber }, { _id: 1, phoneNumber: 1, password: 1, role: 1 }).lean();
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User does not exist.");
    }
    const isPasswordMatched = yield bcrypt_1.default.compare(password, isUserExist.password);
    if (isUserExist.password && !isPasswordMatched) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Password is incorrect.");
    }
    //token generating
    const accessToken = jwtHalpers_1.jwtHelpers.createToken({ _id: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist._id, role: isUserExist.role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHalpers_1.jwtHelpers.createToken({ _id: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist._id, role: isUserExist.role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
const refreshTokenService = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let verifiedToken = null;
    try {
        verifiedToken = jwtHalpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Invalide Refresh Token");
    }
    //checking deleted user's refresh token
    const { _id, role } = verifiedToken;
    let newAccessToken = "";
    if (role === "admin") {
        const isUserExist = yield admin_model_1.Admin.findOne({ _id }, { _id: 1, phoneNumber: 1, password: 1, role: 1 }).lean();
        if (!isUserExist) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User does not exist.");
        }
        //generate new token
        newAccessToken = jwtHalpers_1.jwtHelpers.createToken({ _id: isUserExist._id, role: isUserExist.role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    }
    if (role === "buyer" || role === "seller") {
        const isUserExist = yield user_model_1.User.findOne({ _id }, { _id: 1, phoneNumber: 1, password: 1, role: 1 }).lean();
        if (!isUserExist) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User does not exist.");
        }
        //generate new token
        newAccessToken = jwtHalpers_1.jwtHelpers.createToken({ _id: isUserExist._id, role: isUserExist.role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    }
    return {
        accessToken: newAccessToken,
    };
});
exports.AuthService = {
    createUserService,
    loginUserService,
    refreshTokenService,
};
