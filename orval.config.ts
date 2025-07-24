import { defineConfig } from "orval";
import { loadEnv } from "vite";

const env = loadEnv(process.env.NODE_ENV || "development", process.cwd());

const isProduction = env.VITE_ENV === "production";

const swaggerJson = "swagger/v1/swagger.json";

export default defineConfig({
  api: {
    input: isProduction
      ? `${env.VITE_BASE_URL_API_PROD}/${swaggerJson}`
      : `${env.VITE_BASE_URL_API_DEV}/${swaggerJson}`,
    output: {
      target: "./src/services/api.ts",
      schemas: './src/models',
      client: "axios",
      clean: true,
      baseUrl: isProduction
        ? env.VITE_BASE_URL_API_PROD
        : env.VITE_BASE_URL_API_DEV
    },
  },
});
