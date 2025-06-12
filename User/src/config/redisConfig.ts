import dotenv from "dotenv";
import { createClient } from "redis";

dotenv.config();

export const redisClient = createClient({ url: process.env.REDIS_URI });

redisClient.on("error", (err) => console.error("Redis Client Error...", err));

export async function redisConnection() {
  await redisClient.connect();
  console.log("Redis connected...");
}
