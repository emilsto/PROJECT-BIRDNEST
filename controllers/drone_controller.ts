import * as Express from "express";
import Drone from "../models/drone_model";

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
    if (duplicateDrone) {
        //perform a check, if the duplicateDrone.closestDistance is bigger than the req.body.closestDistance, then update the drone
        if (duplicateDrone.closestDistance === null || duplicateDrone.closestDistance > req.body.closestDistance)  {
            if(req.body.closestDistance === null) {
                //just return if the duplicateDrone.closestDistance is null, because the drone is in the database, but the closestDistance is null
                //this is not so clean, but it works
                //the problem is that the closestDistance is null, because the drone is not in the unallowed area
                //but the drone is in the database, so we dont want to update the drone
                console.log("Drone " + req.body.id + " is in the database, but it is not in the unallowed area!");
                return;
            }
            //here it is confirmed that pilot has violated the unallowed area, therefore get the pilot info
            //call the API to get the pilot info
            const response = await axios.get(`http://localhost:4000/api/pilots/${req.body.id}`);

            console.log("Drone " + req.body.id + " has a new closest distance of " + req.body.closestDistance + "m");
            console.log("Drone" + req.body.id + " old closest distance: " + duplicateDrone.closestDistance + "m");
            await Drone.findOne
            ({ id:
                req.body.id
            }).updateOne
            //update the drone, but dont update the recordedAt time
            ({ id: req.body.id,
                positionX: req.body.positionX,
                positionY: req.body.positionY,
                positionZ: req.body.positionZ,
                latestTrespassing: req.body.latestTrespassing,
                closestDistance: req.body.closestDistance,
            });
            return res.send("Drone updated!");
        }
        //if the duplicateDrone.closestDistance is smaller than the req.body.closestDistance, then do nothing
        return;
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

