import express from "express";
import {
  createRideZodSchema,
  updateRideStatusZodSchema,
} from "./ride.validation";
import { RideControllers } from "./ride.controller";

import { validateRequest } from "../../middlewares/validateRequest";
import { checkAuth } from "../../middlewares/checkAuth";
import { checkRole } from "../../middlewares/checkRole";
import { userRoles } from "../../constants/role";

const router = express.Router();

router.post(
  "/request",
  validateRequest(createRideZodSchema),
  checkAuth,
  RideControllers.createRide
);

router.get("/my", checkAuth, RideControllers.getMyRides);

router.patch(
  "/status/:id",
  validateRequest(updateRideStatusZodSchema),
  checkAuth,
  checkRole(userRoles.DRIVER),
  RideControllers.updateRideStatus
);

router.patch(
  "/accept/:id",
  checkAuth,
  checkRole(userRoles.DRIVER),
  RideControllers.assignDriver
);

export const RideRoutes = router;
