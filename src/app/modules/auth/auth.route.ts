import express from "express";
import { AuthController } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";

const router = express.Router();

router.post(
  "/signup",
  validateRequest(AuthValidation.createUserZodSchema),
  AuthController.createUser
);

export const AuthRoutes = router;
