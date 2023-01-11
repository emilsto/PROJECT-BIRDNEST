"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const pilot_model_1 = __importDefault(require("./pilot_model"));
//Schema for the drone model
const droneSchema = new mongoose_2.Schema({
    id: String,
    positionX: Number,
    positionY: Number,
    positionZ: Number,
    recordedAt: String,
    latestTrespassing: String,
    closestDistance: Number,
    pilot: pilot_model_1.default.schema
});
exports.default = mongoose_1.default.model("Drone", droneSchema);
