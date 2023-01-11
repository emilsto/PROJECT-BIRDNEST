"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
//Schema for the pilot model
const pilotSchema = new mongoose_2.Schema({
    pilotId: String,
    firstName: String,
    lastName: String,
    phoneNumber: String,
    email: String,
});
exports.default = mongoose_1.default.model("Pilot", pilotSchema);
