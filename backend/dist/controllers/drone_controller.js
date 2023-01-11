"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllDrones = exports.getTrespassingDrones = exports.deleteDrone = exports.addDrone = exports.getDrones = void 0;
const drone_model_1 = __importDefault(require("../models/drone_model"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "../.env" });
const port = process.env.PORT;
const axios_1 = __importDefault(require("../api/axios"));
const getDrones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const drones = yield drone_model_1.default.find();
    res.send(drones);
});
exports.getDrones = getDrones;
const addDrone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //check if the drone is already in the database
    try {
        const duplicateDrone = yield drone_model_1.default.findOne({ id: req.body.id
        });
        //here it is confirmed that pilot has violated the unallowed area, therefore get the pilot info
        //call the API to get the pilot info
        const response = yield axios_1.default.put(`http://localhost:${port}/api/pilots/${req.body.id}`);
        const pilot = response.data;
        if (duplicateDrone) {
            //perform a check, if the duplicateDrone.closestDistance is bigger than the req.body.closestDistance, then update the drone
            //duplicateDrone.closestDistance null should never happen, but just to make TypeScript happy
            if (duplicateDrone.closestDistance === null || duplicateDrone.closestDistance > req.body.closestDistance) {
                //if the duplicateDrone.closestDistance is bigger than the req.body.closestDistance, then update the drone with new data
                yield drone_model_1.default.findOneAndUpdate({ id: req.body.id }, { $set: {
                        id: req.body.id,
                        positionX: req.body.positionX,
                        positionY: req.body.positionY,
                        positionZ: req.body.positionZ,
                        latestTrespassing: req.body.latestTrespassing,
                        closestDistance: req.body.closestDistance,
                        pilot: pilot
                    } }, 
                //return the updated document instead of the original document
                { new: true });
                return res.send("Drone updated!");
            }
            //if the duplicateDrone.closestDistance is smaller than the req.body.closestDistance, then do nothing
            return res.send("Drone not updated!");
        }
        else {
            //if there is no duplicate drone, then add the drone to the database
            req.body.pilot = pilot;
            yield drone_model_1.default.create(req.body);
            res.send("Drone added!");
        }
    }
    catch (error) {
        console.log(error);
        res.send("Error!");
    }
});
exports.addDrone = addDrone;
//delete drone if it has not been updated in the last 10 minutes
const deleteDrone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const drone = yield drone_model_1.default.findOne({ id: req.params.id });
    if (drone) {
        const now = new Date().getTime();
        const recordedAt = new Date(drone.recordedAt).getTime();
        const diff = now - recordedAt;
        if (diff > 600000) {
            console.log("Drone " + drone.id + " has not been updated in the last 10 minutes!");
            console.log("Deleting drone " + drone.id + " from the database...");
            yield drone_model_1.default.deleteOne({ id: req.params.id });
            res.send("Drone deleted!");
        }
        else {
            console.log("Drone " + drone.id + " has been updated in the last 10 minutes!");
            res.send("Drone not deleted!");
        }
    }
    else {
        console.log("Drone " + req.params.id + " is not in the database!");
        res.send("Drone not deleted!");
    }
});
exports.deleteDrone = deleteDrone;
//get all drones who have trespassed in
const getTrespassingDrones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const drones = yield drone_model_1.default.find({ latestTrespassing: { $ne: null } }).sort({ latestTrespassing: -1 });
    res.send(drones);
});
exports.getTrespassingDrones = getTrespassingDrones;
//delete all drones, mainly for testing purposes and to clear the database
const deleteAllDrones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield drone_model_1.default.deleteMany({});
    res.send("All drones deleted!");
});
exports.deleteAllDrones = deleteAllDrones;
