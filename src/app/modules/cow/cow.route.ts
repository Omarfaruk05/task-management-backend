import express from "express";
import { CowController } from "./cow.controller";
import validateRequest from "../../middlewares/validateRequest";
import { CowValidation } from "./cow.validation";
import auth from "../../middlewares/auth";
import { ENUM_ROLE } from "../../../enums/user";

const router = express.Router();

// create cow
router.post(
  "/",
  auth(ENUM_ROLE.SELLER),
  validateRequest(CowValidation.createCowZodSchema),
  CowController.createCow
);

// get all cow
router.get(
  "/",
  auth(ENUM_ROLE.ADMIN, ENUM_ROLE.SELLER, ENUM_ROLE.BUYER),
  CowController.getAllCows
);

// get a cow with id
router.get(
  "/:id",
  auth(ENUM_ROLE.ADMIN, ENUM_ROLE.SELLER, ENUM_ROLE.BUYER),
  CowController.getSingleCow
);

// update cow
router.patch(
  "/:id",
  auth(ENUM_ROLE.SELLER),
  validateRequest(CowValidation.updateCowZodSchema),
  CowController.updateCow
);

// delete cow
router.delete("/:id", auth(ENUM_ROLE.SELLER), CowController.deleteCow);

export const CowRoutes = router;
