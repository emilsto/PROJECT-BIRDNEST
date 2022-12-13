import * as Express from "express";
import Pilot from "../models/pilot_model";
import xml2js from "xml2js";

import axios from "../api/axios";

export const setPilot = async (req: Express.Request, res: Express.Response) => {
    try {
    const drone_id = req.params.drone_id;
    const response = await axios.get(`/pilots/${drone_id}`);
    const data = response.data;

    //check if pilot is already in the database
    const duplicatePilot = await Pilot.findOne
    ({ pilotId:
        data.pilotId
    });
    if (duplicatePilot) {
        console.log("Pilot " + data.pilotId + " is already in the database!");
        return;
    }
    //post the pilot to the database
    await Pilot.create(data);
    console.log("Pilot " + data.pilotId + " added to the database!");

    res.send("Pilot created!");
    } catch (error) {
        console.log(error);
        res.send("Error!");
    }
};

export const getPilots = async (req: Express.Request, res: Express.Response) => {
    const pilots = await Pilot.find();
    res.send(pilots);
}

//delete all pilots
export const deleteAllPilots = async (req: Express.Request, res: Express.Response) => {
    await Pilot.deleteMany({});
    res.send("All pilots deleted!");
}
