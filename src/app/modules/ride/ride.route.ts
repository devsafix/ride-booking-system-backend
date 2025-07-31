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

// A rider can request a ride
router.post(
  "/request",
  checkAuth,
  checkRole(userRoles.RIDER),
  validateRequest(createRideZodSchema),
  RideControllers.requestRide
);

// Get my ride history (for both riders and drivers, and all for admin)
router.get("/my", checkAuth, RideControllers.getMyRides);
router.get(
  "/all-rides",
  checkAuth,
  checkRole(userRoles.ADMIN),
  RideControllers.getMyRides
);

// Drivers can view all pending ride requests
router.get(
  "/pending",
  checkAuth,
  checkRole(userRoles.DRIVER),
  RideControllers.getPendingRides
);

// Drivers can accept a ride
router.patch(
  "/accept/:id",
  checkAuth,
  checkRole(userRoles.DRIVER),
  RideControllers.acceptRide
);

// Drivers can reject a ride
router.patch(
  "/reject/:id",
  checkAuth,
  checkRole(userRoles.DRIVER),
  RideControllers.rejectRide
);

// Drivers can update the status of their assigned ride
router.patch(
  "/status/:id",
  checkAuth,
  checkRole(userRoles.DRIVER),
  validateRequest(updateRideStatusZodSchema),
  RideControllers.updateRideStatus
);

// Riders can cancel a ride
router.patch(
  "/cancel/:id",
  checkAuth,
  checkRole(userRoles.RIDER),
  RideControllers.cancelRide
);

export const RideRoutes = router;
