// src/app/modules/user/user.route.ts
import express from "express";
import { UserControllers } from "./user.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { checkRole } from "../../middlewares/checkRole";
import { userRoles } from "../../constants/role";
import { validateRequest } from "../../middlewares/validateRequest";
import { userIdParamZodSchema } from "./user.validation";

const router = express.Router();

router.get(
  "/all-users",
  checkAuth,
  checkRole(userRoles.ADMIN),
  UserControllers.getUsers
);
router.patch(
  "/block/:id",
  checkAuth,
  checkRole(userRoles.ADMIN),
  validateRequest(userIdParamZodSchema),
  UserControllers.block
);
router.patch(
  "/unblock/:id",
  checkAuth,
  checkRole(userRoles.ADMIN),
  validateRequest(userIdParamZodSchema),
  UserControllers.unblock
);
router.patch(
  "/approve/:id",
  checkAuth,
  checkRole(userRoles.ADMIN),
  validateRequest(userIdParamZodSchema),
  UserControllers.approve
);
router.patch(
  "/suspend/:id",
  checkAuth,
  checkRole(userRoles.ADMIN),
  validateRequest(userIdParamZodSchema),
  UserControllers.suspend
);

export const UserRoutes = router;
