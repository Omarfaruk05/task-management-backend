"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const order_validation_1 = require("./order.validation");
const order_controller_1 = require("./order.controller");
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
// create order route
router.post("/", (0, auth_1.default)(user_1.ENUM_ROLE.BUYER), (0, validateRequest_1.default)(order_validation_1.OrderValidation.createOrderZodSchema), order_controller_1.OrderController.createOrder);
// get all order route
router.get("/", (0, auth_1.default)(user_1.ENUM_ROLE.ADMIN, user_1.ENUM_ROLE.BUYER, user_1.ENUM_ROLE.SELLER), order_controller_1.OrderController.getAllOrders);
// get single order route
router.get("/:id", (0, auth_1.default)(user_1.ENUM_ROLE.ADMIN, user_1.ENUM_ROLE.BUYER, user_1.ENUM_ROLE.SELLER), order_controller_1.OrderController.getSingleOrder);
exports.OrderRoutes = router;
