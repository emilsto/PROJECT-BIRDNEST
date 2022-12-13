import React from 'react';
import DroneCard from './DroneCard';
import Drone from '../interfaces/Drone_interface';

interface DroneListProps {
    drones: Drone[];
}



const DroneList = (props: DroneListProps) => {
    return (
        <section className="flex flex-col ">
            <div className='flex flex-row justify-center '>

            <p>Listening for new violations in the NDZ! Bleep!</p>
            </div>
        <div className='flex flex-col-reverse max-w-lg'>
        {props.drones.map((drone) => {
            return <DroneCard drone={drone} key={drone.id} />;
        })
        }
        </div>
        </section>
    );
};

export default DroneList;