"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("./user.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
//get all users route
router.get("/", (0, auth_1.default)(user_1.ENUM_ROLE.ADMIN), user_controller_1.UserController.getAllUsers);
//get my profile route
router.get("/my-profile", (0, auth_1.default)(user_1.ENUM_ROLE.USER, user_1.ENUM_ROLE.ADMIN), user_controller_1.UserController.getMyProfile);
//update my profile route
router.patch("/my-profile", (0, auth_1.default)(user_1.ENUM_ROLE.USER, user_1.ENUM_ROLE.ADMIN), (0, validateRequest_1.default)(user_validation_1.UserValidation.updateUserZodSchema), user_controller_1.UserController.updateMyProfile);
//get single user route
router.get("/:id", (0, auth_1.default)(user_1.ENUM_ROLE.ADMIN), user_controller_1.UserController.getSingleUser);
//update single user route
router.patch("/:id", (0, auth_1.default)(user_1.ENUM_ROLE.ADMIN), (0, validateRequest_1.default)(user_validation_1.UserValidation.updateUserZodSchema), user_controller_1.UserController.updateUser);
// delete single user route
router.delete("/:id", (0, auth_1.default)(user_1.ENUM_ROLE.ADMIN), user_controller_1.UserController.deleteUser);
exports.UserRoutes = router;
