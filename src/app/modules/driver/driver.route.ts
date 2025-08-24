import express from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { checkRole } from "../../middlewares/checkRole";
import { userRoles } from "../../constants/role";
import { DriverControllers } from "./driver.controller";

const router = express.Router();

router.patch(
  "/availability",
  checkAuth,
  checkRole(userRoles.DRIVER),
  DriverControllers.updateAvailability
);

router.get(
  "/earnings",
  checkAuth,
  checkRole(userRoles.DRIVER),
  DriverControllers.getEarnings
);

export const DriverRoutes = router;
