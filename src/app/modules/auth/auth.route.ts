import express from "express";
import { AuthControllers } from "./auth.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createUserZodSchema } from "../user/user.validation";
import { checkAuth } from "../../middlewares/checkAuth";

const router = express.Router();

router.post(
  "/register",
  validateRequest(createUserZodSchema),
  AuthControllers.register
);
router.post("/login", AuthControllers.login);
router.post("/logout", AuthControllers.logout);
router.patch("/change-password", checkAuth, AuthControllers.changePassword);

export const AuthRoutes = router;
