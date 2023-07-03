import express from "express";
import { AdminController } from "./admin.controller";
import { AdminValidation } from "./admin.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

// create admin route
router.post(
  "/create-admin",
  validateRequest(AdminValidation.createAdminZodSchema),
  AdminController.createAdmin
);
// login admin route
router.post(
  "/login",
  validateRequest(AdminValidation.AdminLoginZodSchema),
  AdminController.loginAdmin
);

export const AdminRoutes = router;
