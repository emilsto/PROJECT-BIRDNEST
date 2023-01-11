import express from "express";
import xml2js from "xml2js";
import axios from "./api/axios";
import dotenv from "dotenv";
import cors from "cors";

const corsOptions = {
    origin: ["http://localhost:3000", "http://ec2-13-48-25-197.eu-north-1.compute.amazonaws.com"],
    optionsSuccessStatus: 200,
    Credentials: true,
};

dotenv.config();

import connect from "./utils/connect";
import droneRouter from "./routes/drone_route";
import pilotRouter from "./routes/pilot_route";
import { checkDroneTrespassing } from "./helpers/checkDroneTrespassing";

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

const port = process.env.PORT;
//test route
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use("/api/drones", droneRouter);
app.use("/api/pilots", pilotRouter);

//Interval func that fetches the data from the API every 2 seconds
setInterval(async () => {
    try {
        const response = await axios.get("/drones");
        const xml = response.data;
        const parser = new xml2js.Parser();
        parser.parseString(xml, (err, result) => {
              const drones = (result.report.capture[0].drone);
              const timestamp = (result.report.capture[0].$.snapshotTimestamp);
              drones.forEach((drone: any) => {
                let newDrone = {
                  id: drone.serialNumber[0],
                  positionX: drone.positionX[0],
                  positionY: drone.positionY[0],
                  positionZ: drone.altitude[0],
                  recordedAt: timestamp,
                  latestTrespassing: null,
                  closestDistance: null,
                  pilot: null
              }
              checkDroneTrespassing(newDrone);
              if(newDrone.closestDistance !== null) {
                axios.post(`http://localhost:${port}/api/drones`, newDrone);
            } else {
                //drone has not passed unallowed area, so we do not need its data
                console.log("Drone " + newDrone.id + " has not passed unallowed area!, ignore it!");
                }
            }
            );
        });
       
    }
    catch (err) {
        console.log(err);
        //wait

    }
}, 2100); //wait 2.1 seconds to avoid getting blocked by the API

//Interval func to send delete request for drones that have not been updated in the last 10 minutes
setInterval(async () => {
    console.log("Deleting drones that have not been updated in the last 10 minutes...");
    const drones = await axios.get(`http://localhost:${port}/api/drones`);
    drones.data.forEach((drone: any) => {
            axios.delete(`http://localhost:${port}/api/drones/` + drone.id);
    });
}, 60000);

//start the server 
app.listen(port, async () => {
  console.log(`Server running at http://localhost:${port}`);
  await connect();
});
