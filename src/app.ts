import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { envVariables } from "./app/config/env";
import { router } from "./app/routes";

const app: Application = express();

// Middlewares
app.use(cors({ origin: envVariables.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// all routes
app.use("/api/v1/", router);

app.get("/", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ status: "OK", message: "Ride Booking API is working." });
});

export default app;
