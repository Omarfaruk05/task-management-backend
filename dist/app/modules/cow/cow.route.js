"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const cow_controller_1 = require("./cow.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const cow_validation_1 = require("./cow.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
// create cow
router.post("/", (0, auth_1.default)(user_1.ENUM_ROLE.SELLER), (0, validateRequest_1.default)(cow_validation_1.CowValidation.createCowZodSchema), cow_controller_1.CowController.createCow);
// get all cow
router.get("/", (0, auth_1.default)(user_1.ENUM_ROLE.ADMIN, user_1.ENUM_ROLE.SELLER, user_1.ENUM_ROLE.BUYER), cow_controller_1.CowController.getAllCows);
// get a cow with id
router.get("/:id", (0, auth_1.default)(user_1.ENUM_ROLE.ADMIN, user_1.ENUM_ROLE.SELLER, user_1.ENUM_ROLE.BUYER), cow_controller_1.CowController.getSingleCow);
// update cow
router.patch("/:id", (0, auth_1.default)(user_1.ENUM_ROLE.SELLER), (0, validateRequest_1.default)(cow_validation_1.CowValidation.updateCowZodSchema), cow_controller_1.CowController.updateCow);
// delete cow
router.delete("/:id", (0, auth_1.default)(user_1.ENUM_ROLE.SELLER), cow_controller_1.CowController.deleteCow);
exports.CowRoutes = router;
