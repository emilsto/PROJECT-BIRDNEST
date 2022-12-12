import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

//make typescript happy
declare const process: {
    env: {
        MONGO_URI: string
    }
}

export default async function connect() {
    console.log("Connecting to database...");
    try {
        mongoose.connect(process.env.MONGO_URI);
        mongoose.set("strictQuery", false);
        console.log("Database connected");
    } catch (err) {
        console.log(err);
    }
}