import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";

export const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
