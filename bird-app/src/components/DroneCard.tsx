import React from "react";
import Drone from "../interfaces/Drone_interface";
import droneImage from "../assets/drone.svg";

interface DroneCardProps {
    drone: Drone;
}

const DroneCard = (props: DroneCardProps) => {

    //This makes me go mad, why is this not working?
    if (typeof props.drone.latestTrespassing === "string") {
        const date = new Date(props.drone.latestTrespassing);
        if (isNaN(date.getTime())) {
          // The date is not valid, handle the error
          console.log("Invalid date");
        } else {
          // The date is valid, format it using the Finnish locale
          props.drone.latestTrespassing = date.toLocaleString("fi-FI");
        }
      }

    return (
<div
      className="flex-col border border-slate-50 rounded-none p-4 hover:bg-slate-100"
    >
      <div className="flex">
        <img
          className="rounded-full w-12 h-12 hover:opacity-75"
          src={droneImage}
          alt=""
        ></img>
        <div className=" mx-1">
          <div className="flex flex-row">
              <p className="hover:text-slate-700">{props.drone.pilot?.firstName} {props.drone.pilot?.lastName}</p>
          </div>
          <p className="text-gray-400">{props.drone.pilot?.phoneNumber}</p>
            <p className="text-gray-400">{props.drone.pilot?.email}</p>
        </div>
      </div>
      <div className="max-w-220 mx-12">
      <p>Drone ID: {props.drone.id}</p>
            <p>Closest distance to the nest: {props.drone.closestDistance?.toFixed(1)} meters</p>
            <p>Latest trespassing: {props.drone.latestTrespassing}</p>
      </div>
    </div>
    );
};

export default DroneCard;
