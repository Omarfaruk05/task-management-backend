"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_validation_1 = require("./auth.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_controller_1 = require("./auth.controller");
const router = express_1.default.Router();
// create user route
router.post("/signup", (0, validateRequest_1.default)(auth_validation_1.AuthValidation.createUserZodSchema), auth_controller_1.AuthController.createUser);
// user login route
router.post("/login", auth_controller_1.AuthController.loginUser);
// refresh token route
router.post("/refresh-token", auth_controller_1.AuthController.refreshToken);
exports.AuthRoutes = router;
