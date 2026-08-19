import dotenv from "dotenv";

dotenv.config();

const env = {
  PORT: process.env.PORT || "5000",
  NODE_ENV: process.env.NODE_ENV || "development",
  MONGODB_URI: process.env.MONGODB_URI || "",
  CLIENT_URL: process.env.CLIENT_URL || "",
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || "",
};

if (!env.MONGODB_URI) {
  throw new Error("MONGODB_URI is required in environment variables");
}

export default env;
