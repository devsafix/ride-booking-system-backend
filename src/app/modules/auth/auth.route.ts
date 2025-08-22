import express from "express";
import { AuthControllers } from "./auth.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createUserZodSchema } from "../user/user.validation";

const router = express.Router();

router.post(
  "/register",
  validateRequest(createUserZodSchema),
  AuthControllers.register
);
router.post("/login", AuthControllers.login);
router.post("/logout", AuthControllers.logout);

export const AuthRoutes = router;
