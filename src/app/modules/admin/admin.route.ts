import express from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { checkRole } from "../../middlewares/checkRole";
import { userRoles } from "../../constants/role";
import { AdminControllers } from "./admin.controller";

const router = express.Router();

router.get(
  "/reports/rides",
  checkAuth,
  checkRole(userRoles.ADMIN),
  AdminControllers.getRideReport
);

export const AdminRoutes = router;
