import mongoose from "mongoose";
import { Schema } from "mongoose";
import drone_interface from "../interfaces/drone_interface";

//Schema for the drone model
const droneSchema = new Schema({
    id: String,
    positionX: Number,
    positionY: Number,
    positionZ: Number,
    recordedAt: String,
    latestTrespassing: String,
    closestDistance: Number
});

export default mongoose.model<drone_interface>("Drone", droneSchema);