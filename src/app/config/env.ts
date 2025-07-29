import dotenv from "dotenv";
dotenv.config();

interface EnvConfig {
  PORT: string;
  NODE_ENV: "development" | "production";
  DATABASE_URL: string;
  FRONTEND_URL: string;
}

const loadEnvVariables = (): EnvConfig => {
  const requiredVars = ["PORT", "NODE_ENV", "DATABASE_URL", "FRONTEND_URL"];

  for (const key of requiredVars) {
    if (!process.env[key]) {
      throw new Error(`Missing required env variable: ${key}`);
    }
  }

  return {
    PORT: process.env.PORT as string,
    NODE_ENV: process.env.NODE_ENV as "development" | "production",
    DATABASE_URL: process.env.DATABASE_URL as string,
    FRONTEND_URL: process.env.FRONTEND_URL as string,
  };
};

export const envVariables = loadEnvVariables();
