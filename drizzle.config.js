import { defineConfig } from "drizzle-kit";
 
export default defineConfig({
  schema: "./configs/schema.js",
  out: "./drizzle",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://ai-form-builder_owner:FmH3tfrg0eIV@ep-yellow-sun-a1ngzbcd.ap-southeast-1.aws.neon.tech/ai-form-builder?sslmode=require',
  }
});