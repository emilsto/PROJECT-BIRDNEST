import mongoose from "mongoose";
import { Schema } from "mongoose";
import pilot_interface from "../interfaces/pilot_interface";

//Schema for the pilot model
const pilotSchema = new Schema({
    pilotId: String,
    firstName: String,
    lastName : String,
    phoneNumber : String,
    email: String,
});

export default mongoose.model<pilot_interface>("Pilot", pilotSchema);