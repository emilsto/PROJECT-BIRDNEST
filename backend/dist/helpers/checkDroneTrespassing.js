"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDroneTrespassing = void 0;
//check if drones have passed unallowed area
const checkDroneTrespassing = (drone) => {
    const distance = Math.sqrt(Math.pow(250000 - drone.positionX, 2) + Math.pow(250000 - drone.positionY, 2)) / 1000;
    if (distance <= 100) {
        console.log("Drone " + drone.id + " has passed unallowed area!");
        console.log("Distance: " + distance + " m");
        //set the brokeZoneAt time
        drone.latestTrespassing = new Date().toISOString();
        drone.closestDistance = distance;
        console.log("TRESPASSING TIME: " + drone.latestTrespassing);
    }
};
exports.checkDroneTrespassing = checkDroneTrespassing;
