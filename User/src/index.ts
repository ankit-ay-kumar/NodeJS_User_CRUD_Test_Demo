import express from "express";
import { dbConnection } from "./config/dbConfig";
import userRoutes from "./routes/userRoutes";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
// import { redisClient, redisConnection } from "./config/redisConfig";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

if (process.env.NODE_ENV !== "production") {
  const swaggerDoc = YAML.load(path.join(__dirname, "../swagger.yml"));
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
}

app.use("/users", userRoutes);

app.listen(PORT, async () => {
  try {
    // await redisConnection();
    // app.locals.redis = redisClient;

    await dbConnection();
    console.log("App is running on -", PORT);
  } catch (error) {
    console.error("Failed to run app", error);
  }
});
