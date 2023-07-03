"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("./admin.controller");
const admin_validation_1 = require("./admin.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const router = express_1.default.Router();
// create admin route
router.post("/create-admin", (0, validateRequest_1.default)(admin_validation_1.AdminValidation.createAdminZodSchema), admin_controller_1.AdminController.createAdmin);
// login admin route
router.post("/login", (0, validateRequest_1.default)(admin_validation_1.AdminValidation.AdminLoginZodSchema), admin_controller_1.AdminController.loginAdmin);
exports.AdminRoutes = router;
