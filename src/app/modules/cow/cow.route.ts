import express from "express";
import { CowController } from "./cow.controller";
import validateRequest from "../../middlewares/validateRequest";
import { CowValidation } from "./cow.validation";
import auth from "../../middlewares/auth";
import { ENUM_ROLE } from "../../../enums/user";

const router = express.Router();

router.post(
  "/",
  auth(ENUM_ROLE.SELLER),
  validateRequest(CowValidation.createCowZodSchema),
  CowController.createCow
);
router.get(
  "/",
  auth(ENUM_ROLE.ADMIN, ENUM_ROLE.SELLER, ENUM_ROLE.BUYER),
  CowController.getAllCows
);
router.get(
  "/:id",
  auth(ENUM_ROLE.ADMIN, ENUM_ROLE.SELLER, ENUM_ROLE.BUYER),
  CowController.getSingleCow
);
router.patch("/:id", auth(ENUM_ROLE.SELLER), CowController.updateCow);
router.delete("/:id", auth(ENUM_ROLE.SELLER), CowController.deleteCow);

export const CowRoutes = router;
