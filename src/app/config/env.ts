import dotenv from "dotenv";
dotenv.config();

interface EnvConfig {
  PORT: string;
  NODE_ENV: "development" | "production";
  DATABASE_URL: string;
  FRONTEND_URL: string;
  JWT_ACCESS_SECRET: string;
  JWT_ACCESS_EXPIRES: string;
  BCRYPT_SALT_ROUND: string;
  ADMIN_EMAIL: string;
  ADMIN_PASSWORD: string;
}

const loadEnvVariables = (): EnvConfig => {
  const requiredVars = [
    "PORT",
    "NODE_ENV",
    "DATABASE_URL",
    "FRONTEND_URL",
    "JWT_ACCESS_EXPIRES",
    "JWT_ACCESS_SECRET",
    "BCRYPT_SALT_ROUND",
    "ADMIN_EMAIL",
    "ADMIN_PASSWORD",
  ];

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
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
    JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES as string,
    BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL as string,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD as string,
  };
};

export const envVariables = loadEnvVariables();
