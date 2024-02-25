"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const task_validation_1 = require("./task.validation");
const task_controller_1 = require("./task.controller");
const router = express_1.default.Router();
// create task route
router.post("/", (0, validateRequest_1.default)(task_validation_1.TaskValidation.createTaskZodSchema), task_controller_1.TaskController.createTask);
// get all task route
router.get("/", task_controller_1.TaskController.getAllTasks);
// get single task route
router.get("/:id", task_controller_1.TaskController.getSingleTask);
// update task route
router.patch("/:id", (0, auth_1.default)(user_1.ENUM_ROLE.ADMIN, user_1.ENUM_ROLE.USER), (0, validateRequest_1.default)(task_validation_1.TaskValidation.updateTaskZodSchema), task_controller_1.TaskController.updateTask);
// delete task route
router.delete("/:id", (0, auth_1.default)(user_1.ENUM_ROLE.ADMIN, user_1.ENUM_ROLE.USER), task_controller_1.TaskController.deleteTask);
exports.TaskRoutes = router;
