import React from "react";
import DroneCard from "./DroneCard";
import DroneMap from "./DroneMap";
import Drone from "../interfaces/Drone_interface";
import "./DroneList.css"

interface DroneListProps {
  drones: Drone[];
}

const TH_CSS = "w-full px-12"

const DroneList = (props: DroneListProps) => {


  return (
    <section className="">
      <div className="flex flex-row" >
      <p className="text-6xl  text-black">Drones</p>
      <div className="m-6 w-6 h-6 bg-red-500 animate-pulse rounded-full"></div>
      </div>
      <p className="text-4xl  text-black">In the NDZ</p>
      <p className="text-2xl  text-black">Total unique violators during last 10 minutes: {props.drones.length} </p>
      <table className="text-left">
        <thead className="flex text-white bg-black">
          <tr className="flex whitespace-nowrap">
            <th className={TH_CSS}>Drone ID</th>
            <th className={TH_CSS}>Pilot</th>
            <th className={TH_CSS}>Phone</th>
            <th className={TH_CSS}>Email</th>
            <th className={TH_CSS}>Trespassed at</th>
            <th className={TH_CSS}>Closest distance</th>
          </tr>
        </thead>
        <tbody className="flex flex-col overflow-y-scroll w-full droneTable">
        {props.drones.map((drone) => {
          return <DroneCard drone={drone} key={drone.id} />;
        })}
        </tbody>
      </table>
      <div className="flex flex-row" >
      <div className="flex flex-col" >
      <p className="text-6xl  text-black">Drone-O-Visualiz0r</p>
      <p className="text-4xl  text-black">Maps of latest violation locations</p>
      <p className="text-2xl">(Yeah, they are also updated)</p>
      </div>
      <div className="flex flex-row">
      <div className="flex justify-center items-center m-6 w-24 h-24 bg-red-500 rounded-full text-white">
        <p className="">Drone</p>
      </div>
      <div className="flex justify-center items-center m-6 w-24 h-24 bg-blue-500 rounded-full text-white">
        <p>Bird nest</p>
      </div>
      <div className="flex justify-center items-center m-6 w-24 h-24 border-2 border-black rounded-full text-white">
        <p className="text-black">NDZ</p>
      </div>
      </div>
      </div>
        <div className="grid grid-cols-2 border-2 border-black">
          {props.drones.map((drone) => {
            return <DroneMap drone={drone} key={drone.id} />;
          }
          )}
          </div>
    </section>
  );
};

export default DroneList;
