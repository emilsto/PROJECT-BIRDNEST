import Drone from "../interfaces/drone_interface";

//check if drones have passed unallowed area
export const checkDroneTrespassing = (drone : Drone) => {
    const distance: number = Math.sqrt(Math.pow(250000 - drone.positionX, 2) + Math.pow(250000 - drone.positionY, 2))/1000;
  if (distance <= 100) {
    console.log("Drone " + drone.id + " has passed unallowed area!");
    console.log("Distance: " + distance + " m");
    //set the brokeZoneAt time
    drone.latestTrespassing = new Date().toISOString();
    drone.closestDistance = distance;
  }
};