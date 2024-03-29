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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_model_1 = require("./user.model");
const getAllUserService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find({}, { password: 0 });
    return result;
});
const getSingleUserService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findById(id, { password: 0 });
    return result;
});
const updateUserService = (id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOneAndUpdate({ _id: id }, updatedData, {
        new: true,
    });
    return result;
});
const deleteUserService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndDelete(id);
    return result;
});
const getMyProfileService = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findById(user._id, { password: 0 });
    return result;
});
const updateMyProfileService = (user, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOneAndUpdate({ _id: user._id }, updatedData, {
        new: true,
    });
    return result;
});
exports.UserService = {
    getAllUserService,
    getSingleUserService,
    updateUserService,
    deleteUserService,
    getMyProfileService,
    updateMyProfileService,
};
