import express from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";
import auth from "../../middlewares/auth";
import { ENUM_ROLE } from "../../../enums/user";

const router = express.Router();
//get all users route
router.get("/", auth(ENUM_ROLE.ADMIN), UserController.getAllUsers);

//get my profile route
router.get(
  "/my-profile",
  auth(ENUM_ROLE.SELLER, ENUM_ROLE.BUYER),
  UserController.getMyProfile
);

//update my profile route
router.patch(
  "/my-profile",
  auth(ENUM_ROLE.SELLER, ENUM_ROLE.BUYER),
  validateRequest(UserValidation.updateUserZodSchema),
  UserController.updateMyProfile
);

//get single user route
router.get("/:id", auth(ENUM_ROLE.ADMIN), UserController.getSingleUser);

//update single user route
router.patch(
  "/:id",
  auth(ENUM_ROLE.ADMIN),
  validateRequest(UserValidation.updateUserZodSchema),
  UserController.updateUser
);

// delete single user route
router.delete("/:id", auth(ENUM_ROLE.ADMIN), UserController.deleteUser);

export const UserRoutes = router;
