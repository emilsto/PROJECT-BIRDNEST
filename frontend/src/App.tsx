import React, { useState, useEffect } from "react";
import axios from "./api/axios";

//import the interface
import Drone from "./interfaces/Drone_interface";
//import the DroneList component
import DroneList from "./components/DroneList";

const App = () => {
  //create a state for the drones
  const [drones, setDrones] = useState<Drone[]>([]);

  useEffect(() => {
    const fetchDrones = async () => {
      try {
        const response = await axios.get("/drones/trespassers");
        setDrones(response.data);
      } catch (error: any) {}
    };
    fetchDrones();
    const interval = setInterval(() => {
      fetchDrones();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
      <div className="flex justify-center md:m-5">
        <DroneList drones={drones} />
      </div>
  );
};

export default App;
