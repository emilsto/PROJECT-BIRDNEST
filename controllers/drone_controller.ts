import * as Express from "express";
import Drone from "../models/drone_model";

import {checkDroneTrespassing} from "../helpers/checkDroneTrespassing";

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
    if (duplicateDrone) {
        //if duplicateDrone.latestTrespassing and req.body.latestTrespassing null, then do nothing
        if (req.body.latestTrespassing == null ) {
            console.log(req.body);
            console.log(req.body.id + "Drone already exists and no new trespassing data has been provided, not updating");
            return res.status(200).send("Drone already exists and no new trespassing data has been provided");
        }
        else {
        console.log("UPDATING OLD DRONE WITH ID " + req.body.id + req.body.latestTrespassing );
        console.log
        await Drone.updateOne({ id: req.body.id }, req.body);
        res.send("Drone updated!");
        }
    }
    else {
        console.log("Drone " + req.body.id + " is not in the database!");
        console.log("Adding drone " + req.body.id + " to the database...");
        await Drone.create(req.body);
        res.send("Drone added!");
    }    
    } catch (error) {
        console.log(error);
        res.send("Error!");
    }
}

//delete drone if it has not been updated in the last 20 seconds
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
    const drones = await Drone.find({ latestTrespassing: { $ne: null } });
    res.send(drones);
}

//delete all drones, mainly for testing purposes and to clear the database
export const deleteAllDrones = async (req: Express.Request, res: Express.Response) => {
    await Drone.deleteMany({});
    res.send("All drones deleted!");
}

