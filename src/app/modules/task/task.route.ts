import express from "express";
import validateRequest from "../../middlewares/validateRequest";

import { ENUM_ROLE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import { TaskValidation } from "./task.validation";
import { TaskController } from "./task.controller";

const router = express.Router();

// create task route
router.post(
  "/",
  validateRequest(TaskValidation.createTaskZodSchema),
  TaskController.createTask
);

// get all task route
router.get("/", TaskController.getAllTasks);

// get single task route
router.get("/:id", TaskController.getSingleTask);

// update task route
router.patch(
  "/:id",
  auth(ENUM_ROLE.ADMIN, ENUM_ROLE.USER),
  validateRequest(TaskValidation.updateTaskZodSchema),
  TaskController.updateTask
);

// delete task route
router.delete(
  "/:id",
  auth(ENUM_ROLE.ADMIN, ENUM_ROLE.USER),
  TaskController.deleteTask
);

export const TaskRoutes = router;
