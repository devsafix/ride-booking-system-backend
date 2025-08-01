import express from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { checkRole } from "../../middlewares/checkRole";
import { userRoles } from "../../constants/role";
import { validateRequest } from "../../middlewares/validateRequest";
import { createFeedbackZodSchema } from "./feedback.validation";
import { FeedbackControllers } from "./feedback.controller";

const router = express.Router();

router.post(
  "/submit",
  checkAuth,
  checkRole(userRoles.RIDER),
  validateRequest(createFeedbackZodSchema),
  FeedbackControllers.submitRatingAndFeedback
);

router.get(
  "/driver/:driverId",
  checkAuth,
  FeedbackControllers.getDriverRatings
);

export const FeedbackRoutes = router;
