import express from "express";
import { UserControllers } from "./user.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { checkRole } from "../../middlewares/checkRole";
import { userRoles } from "../../constants/role";

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
  UserControllers.block
);
router.patch(
  "/unblock/:id",
  checkAuth,
  checkRole(userRoles.ADMIN),
  UserControllers.unblock
);
router.patch(
  "/approve/:id",
  checkAuth,
  checkRole(userRoles.ADMIN),
  UserControllers.approve
);
router.patch(
  "/suspend/:id",
  checkAuth,
  checkRole(userRoles.ADMIN),
  UserControllers.suspend
);

export const UserRoutes = router;
