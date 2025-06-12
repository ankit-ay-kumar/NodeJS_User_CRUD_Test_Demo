import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

export async function dbConnection() {
    try{
        await mongoose.connect(process.env.MONGO_DB_URI as string);
        console.log("MongoDB connected...");
    }
    catch(error){
        console.log("MongoDB connection failed", error);
        process.exit(1);
    }
}