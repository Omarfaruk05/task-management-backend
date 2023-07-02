import express from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";
import auth from "../../middlewares/auth";
import { ENUM_ROLE } from "../../../enums/user";

const router = express.Router();
//get all users
router.get("/", auth(ENUM_ROLE.ADMIN), UserController.getAllUsers);

//get my profile
router.get(
  "/my-profile",
  auth(ENUM_ROLE.SELLER, ENUM_ROLE.BUYER),
  UserController.getMyProfile
);

//update my profile
router.patch(
  "/my-profile",
  auth(ENUM_ROLE.SELLER, ENUM_ROLE.BUYER),
  validateRequest(UserValidation.updateUserZodSchema),
  UserController.updateMyProfile
);

//get single user
router.get("/:id", auth(ENUM_ROLE.ADMIN), UserController.getSingleUser);

//update single user
router.patch(
  "/:id",
  auth(ENUM_ROLE.ADMIN),
  validateRequest(UserValidation.updateUserZodSchema),
  UserController.updateUser
);

router.delete("/:id", auth(ENUM_ROLE.ADMIN), UserController.deleteUser);

export const UserRoutes = router;
