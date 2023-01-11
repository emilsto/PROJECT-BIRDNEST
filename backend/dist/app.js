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
const express_1 = __importDefault(require("express"));
const xml2js_1 = __importDefault(require("xml2js"));
const axios_1 = __importDefault(require("./api/axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
    Credentials: true,
};
dotenv_1.default.config();
const connect_1 = __importDefault(require("./utils/connect"));
const drone_route_1 = __importDefault(require("./routes/drone_route"));
const pilot_route_1 = __importDefault(require("./routes/pilot_route"));
const checkDroneTrespassing_1 = require("./helpers/checkDroneTrespassing");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOptions));
const port = process.env.PORT;
//test route
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use("/api/drones", drone_route_1.default);
app.use("/api/pilots", pilot_route_1.default);
//Interval func that fetches the data from the API every 2 seconds
setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get("/drones");
    const xml = response.data;
    const parser = new xml2js_1.default.Parser();
    parser.parseString(xml, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            //
            const drones = (result.report.capture[0].drone);
            const timestamp = (result.report.capture[0].$.snapshotTimestamp);
            drones.forEach((drone) => {
                let newDrone = {
                    id: drone.serialNumber[0],
                    positionX: drone.positionX[0],
                    positionY: drone.positionY[0],
                    positionZ: drone.altitude[0],
                    recordedAt: timestamp,
                    latestTrespassing: null,
                    closestDistance: null,
                    pilot: null
                };
                (0, checkDroneTrespassing_1.checkDroneTrespassing)(newDrone);
                if (newDrone.closestDistance !== null) {
                    axios_1.default.post(`http://localhost:${port}/api/drones`, newDrone);
                }
                else {
                    //drone has not passed unallowed area, so we do not need its data
                    console.log("Drone " + newDrone.id + " has not passed unallowed area!, ignore it!");
                }
            });
        }
    });
}), 2000);
//Interval func to send delete request for drones that have not been updated in the last 10 minutes
setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Deleting drones that have not been updated in the last 10 minutes...");
    const drones = yield axios_1.default.get(`http://localhost:${port}/api/drones`);
    drones.data.forEach((drone) => {
        axios_1.default.delete(`http://localhost:${port}/api/drones/` + drone.id);
    });
}), 60000);
//start the server 
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Server running at http://localhost:${port}`);
    yield (0, connect_1.default)();
}));
