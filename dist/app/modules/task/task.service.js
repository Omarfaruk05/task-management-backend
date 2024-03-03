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
exports.TaskService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const task_model_1 = require("./task.model");
const task_constant_1 = require("./task.constant");
// creat task service
const createTaskService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield task_model_1.Task.create(data);
    return result;
});
// get all task service
const getAllTasksService = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: task_constant_1.taskSearchableFields.map((field) => ({
                [field]: {
                    $regex: searchTerm,
                    $options: "i",
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield task_model_1.Task.find(whereConditions);
    return result;
});
// creat single task service
const getSingleTaskService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield task_model_1.Task.findById(id).populate("user");
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Sorry, There is no task with this id.");
    }
    return result;
});
// update task service
const updateTaskService = (id, updatedData, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = user;
    const task = yield task_model_1.Task.findOne({ _id: id, user: _id });
    if (!task) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Can't update the task because this is not task task.");
    }
    const filter = { _id: id };
    const result = yield task_model_1.Task.findOneAndUpdate(filter, updatedData, {
        new: true,
    });
    return result;
});
// delete task service
const deleteTaskService = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = user;
    const task = yield task_model_1.Task.findOne({ _id: id, user: _id });
    if (!task) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Can't delete the task because this is not your task.");
    }
    const result = yield task_model_1.Task.findByIdAndDelete(id);
    return result;
});
exports.TaskService = {
    createTaskService,
    getAllTasksService,
    getSingleTaskService,
    updateTaskService,
    deleteTaskService,
};
