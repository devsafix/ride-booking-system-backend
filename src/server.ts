import mongoose from "mongoose";
import app from "./app";
import { Server } from "http";
import { envVariables } from "./app/config/env";

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(envVariables.DATABASE_URL);
    console.log(`Connected to MongoDB`);

    server = app.listen(envVariables.PORT, () => {
      console.log(`Server is running on port ${envVariables.PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
  }
};

startServer();
