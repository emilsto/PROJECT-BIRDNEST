import * as Express from "express";
import Drone from "../models/drone_model";
import dotenv from "dotenv";

dotenv.config({ path: "../.env"});
const port = process.env.PORT;

import axios from "../api/axios";

export const getDrones = async (req: Express.Request, res: Express.Response) => {
    const drones = await Drone.find();
    res.send(drones);
}

export const addDrone = async (req: Express.Request, res: Express.Response) => {
    //check if the drone is already in the database
    try {
    const duplicateDrone = await Drone.findOne
    ({ id:
        req.body.id
    });
    //here it is confirmed that pilot has violated the unallowed area, therefore get the pilot info
    //call the API to get the pilot info
    const response = await axios.put(`http://localhost:${port}/api/pilots/${req.body.id}`);
    const pilot = response.data;
    if (duplicateDrone) {
        //perform a check, if the duplicateDrone.closestDistance is bigger than the req.body.closestDistance, then update the drone
        //duplicateDrone.closestDistance null should never happen, but just to make TypeScript happy
        if (duplicateDrone.closestDistance === null || duplicateDrone.closestDistance > req.body.closestDistance)  {
            //if the duplicateDrone.closestDistance is bigger than the req.body.closestDistance, then update the drone with new data
            await Drone.findOneAndUpdate(
            { id: req.body.id },
            { $set: {
              id: req.body.id,
              positionX: req.body.positionX,
              positionY: req.body.positionY,
              positionZ: req.body.positionZ,
              latestTrespassing: req.body.latestTrespassing,
              closestDistance: req.body.closestDistance,
              pilot: pilot
            }},
            //return the updated document instead of the original document
            { new: true }
            );
            return res.send("Drone updated!");
        }
        //if the duplicateDrone.closestDistance is smaller than the req.body.closestDistance, then do nothing
        return res.send("Drone not updated!");
    }
    else {
        //if there is no duplicate drone, then add the drone to the database
        req.body.pilot = pilot;
        await Drone.create(req.body);
        res.send("Drone added!");
    }    
    } catch (error) {
        console.log(error);
        res.send("Error!");
    }
}
//delete drone if it has not been updated in the last 10 minutes
export const deleteDrone = async (req: Express.Request, res: Express.Response) => {
    const drone = await Drone.findOne({ id: req.params.id });
    if (drone) {
        const now = new Date().getTime();
        const recordedAt = new Date(drone.recordedAt).getTime();
        const diff = now - recordedAt;
        if (diff > 600000) {
            console.log("Drone " + drone.id + " has not been updated in the last 10 minutes!");
            console.log("Deleting drone " + drone.id + " from the database...");
            await Drone.deleteOne({ id: req.params.id });
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
}

//get all drones who have trespassed in
export const getTrespassingDrones = async (req: Express.Request, res: Express.Response) => {
    const drones = await Drone.find({ latestTrespassing: { $ne: null } }).sort({ latestTrespassing: -1 });
    res.send(drones);
}

//delete all drones, mainly for testing purposes and to clear the database
export const deleteAllDrones = async (req: Express.Request, res: Express.Response) => {
    await Drone.deleteMany({});
    res.send("All drones deleted!");
}
