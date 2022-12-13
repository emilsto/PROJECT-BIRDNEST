import * as Express from "express";
import Pilot from "../models/pilot_model";
import axios from "../api/axios";

export const setPilot = async (req: Express.Request, res: Express.Response) => {
    try {
    const drone_id = req.params.drone_id;
    const response = await axios.get(`/pilots/${drone_id}`);
    //response may be empty, because the pilot is not in the database
    if (response.data === "") {
        const error = new Error("Pilot not found!");
        console.log(error);
        res.send("Error!");
    }
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
    res.send(data);
    } catch (error) {
        console.log(error);
        res.send("Error!");
    }
};
