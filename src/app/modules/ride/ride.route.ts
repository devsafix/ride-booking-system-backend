import express from "express";
import {
  createRideZodSchema,
  updateRideStatusZodSchema,
} from "./ride.validation";
import { RideControllers } from "./ride.controller";

import { validateRequest } from "../../middlewares/validateRequest";
import { checkAuth } from "../../middlewares/checkAuth";

const router = express.Router();

router.post(
  "/request",
  validateRequest(createRideZodSchema),
  checkAuth,
  RideControllers.createRide
);

router.get("/my", RideControllers.getMyRides);

router.patch(
  "/status/:id",
  validateRequest(updateRideStatusZodSchema),
  RideControllers.updateRideStatus
);

router.patch("/accept/:id", RideControllers.assignDriver);

export const RideRoutes = router;
