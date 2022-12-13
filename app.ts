import express from "express";
import xml2js from "xml2js";
import axios from "./api/axios";
import dotenv from "dotenv";

dotenv.config();

import connect from "./utils/connect";

import droneRouter from "./routes/drone_route";
import pilotRouter from "./routes/pilot_route";
import { checkDroneTrespassing } from "./helpers/checkDroneTrespassing";
import { time } from "console";

const app = express();

app.use(express.json());

const port = process.env.PORT;

//test route
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use("/api/drones", droneRouter);
app.use("/api/pilots", pilotRouter);

//routine that fetches the data from the API every 2 seconds
setInterval(async () => {
    const response = await axios.get("/drones");
    const xml = response.data;
    const parser = new xml2js.Parser();
    parser.parseString(xml, (err, result) => {
        if (err) {
            console.log(err);
        } else {
          //
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
          axios.post("http://localhost:4000/api/drones", newDrone);
        }
        );
        }
    });
}, 2000);

//routine to send delete request for drones that have not been updated in the last 10 minutes
setInterval(async () => {
    console.log("Deleting drones that have not been updated in the last 10 minutes...");
    const drones = await axios.get("http://localhost:4000/api/drones");
    drones.data.forEach((drone: any) => {
            axios.delete("http://localhost:4000/api/drones/" + drone.id);
    });
}, 60000);

//start the server 
app.listen(port, async () => {
  console.log(`Server running at http://localhost:${port}`);
  await connect();
});
