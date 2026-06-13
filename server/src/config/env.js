import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { DB_NAME } from "../constants.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const serverEnvPath = path.resolve(__dirname, "../..", ".env");

if (fs.existsSync(serverEnvPath)) {
  dotenv.config({ path: serverEnvPath });
}

const read = (key, fallback = "") => process.env[key]?.trim() || fallback;

const parseOrigins = (...values) =>
  values
    .flatMap((value) => (value || "").split(","))
    .map((origin) => origin.trim().replace(/\/$/, ""))
    .filter(Boolean);

const withDatabaseName = (uri, databaseName) => {
  const trimmedUri = uri.trim();

  try {
    const mongoUrl = new URL(trimmedUri);
    const hasDatabase = mongoUrl.pathname && mongoUrl.pathname !== "/";

    if (!hasDatabase) {
      mongoUrl.pathname = `/${databaseName}`;
    }

    return mongoUrl.toString();
  } catch {
    return `${trimmedUri.replace(/\/$/, "")}/${databaseName}`;
  }
};

const nodeEnv = read("NODE_ENV", "development");
const isProduction = nodeEnv === "production";
const cloudinaryCloudName =
  read("CLOUDINARY_CLOUD_NAME") || read("CLOUDINARY_CLOUDNAME");

const devOrigins = isProduction
  ? []
  : [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://localhost:3000",
      "http://127.0.0.1:3000",
    ];

const corsOrigins = Array.from(
  new Set([
    ...parseOrigins(
      process.env.CORS_ORIGIN,
      process.env.CORS_ORIGIN2,
      process.env.CORS_ORIGINS
    ),
    ...devOrigins,
  ])
);

const missingVariables = [
  "MONGODB_URI",
  "ACCESS_TOKEN_SECRET",
  "ACCESS_TOKEN_EXPIRY",
  "REFRESH_TOKEN_SECRET",
  "REFRESH_TOKEN_EXPIRY",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
].filter((key) => !read(key));

if (!cloudinaryCloudName) {
  missingVariables.push("CLOUDINARY_CLOUD_NAME");
}

if (missingVariables.length) {
  throw new Error(
    `Missing required environment variables: ${missingVariables.join(", ")}`
  );
}


const cookieSameSite = "none";
const cookieSecure = true;

export const env = {
  NODE_ENV: nodeEnv,
  PORT: Number(read("PORT", "8000")),
  CORS_ORIGINS: corsOrigins,
  MONGODB_URI: withDatabaseName(read("MONGODB_URI"), DB_NAME),
  ACCESS_TOKEN_SECRET: read("ACCESS_TOKEN_SECRET"),
  ACCESS_TOKEN_EXPIRY: read("ACCESS_TOKEN_EXPIRY"),
  REFRESH_TOKEN_SECRET: read("REFRESH_TOKEN_SECRET"),
  REFRESH_TOKEN_EXPIRY: read("REFRESH_TOKEN_EXPIRY"),
  CLOUDINARY_CLOUD_NAME: cloudinaryCloudName,
  CLOUDINARY_API_KEY: read("CLOUDINARY_API_KEY"),
  CLOUDINARY_API_SECRET: read("CLOUDINARY_API_SECRET"),
  COOKIE_OPTIONS: {
    httpOnly: true,
    secure: cookieSecure,
    sameSite: cookieSameSite,
  },
};
