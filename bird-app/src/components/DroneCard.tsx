import React, { useEffect, useState } from "react";
import Drone from "../interfaces/Drone_interface";
import droneImage from "../assets/drone.svg";

interface DroneCardProps {
  drone: Drone;
}

const TD_CSS = "w-1/2"

const DroneCard = (props: DroneCardProps) => {

  //This makes me go mad, why is this not working?
  if (typeof props.drone.latestTrespassing === "string") {
    const date = new Date(props.drone.latestTrespassing);
    if (isNaN(date.getTime())) {
      // The date is not valid, handle the error
    } else {
      // The date is valid, format it using the Finnish locale
      props.drone.latestTrespassing = date.toLocaleString("fi-FI");
    }

  }
  return (
    <tr className="flex text-xs text-center border hover:bg-slate-100 py-2">
      <td className={TD_CSS}>{props.drone.id}</td>
      <td className={TD_CSS}>{props.drone.pilot?.firstName} {props.drone.pilot?.lastName}</td>
      <td className={TD_CSS}>{props.drone.pilot?.phoneNumber}</td>
      <td className={TD_CSS}>{props.drone.pilot?.email}</td>
      <td className={TD_CSS}>{props.drone.latestTrespassing}</td>
      <td className={TD_CSS}>{props.drone.closestDistance?.toFixed(2)} <p className="inline">Meters</p></td>
    </tr>

  );
};

export default DroneCard;
