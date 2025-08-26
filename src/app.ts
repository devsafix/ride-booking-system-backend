import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { envVariables } from "./app/config/env";
import { router } from "./app/routes";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("trust proxy", 1);
app.use(cors({ origin: envVariables.FRONTEND_URL, credentials: true }));

// all routes
app.use("/api/v1/", router);

app.get("/", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ status: "OK", message: "Ride Booking API is working." });
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
