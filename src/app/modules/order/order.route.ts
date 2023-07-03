import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { OrderValidation } from "./order.validation";
import { OrderController } from "./order.controller";
import { ENUM_ROLE } from "../../../enums/user";
import auth from "../../middlewares/auth";

const router = express.Router();

// create order route
router.post(
  "/",
  auth(ENUM_ROLE.BUYER),
  validateRequest(OrderValidation.createOrderZodSchema),
  OrderController.createOrder
);

// get all order route
router.get(
  "/",
  auth(ENUM_ROLE.ADMIN, ENUM_ROLE.BUYER, ENUM_ROLE.SELLER),
  OrderController.getAllOrders
);

// get single order route
router.get(
  "/:id",
  auth(ENUM_ROLE.ADMIN, ENUM_ROLE.BUYER, ENUM_ROLE.SELLER),
  OrderController.getSingleOrder
);

export const OrderRoutes = router;
