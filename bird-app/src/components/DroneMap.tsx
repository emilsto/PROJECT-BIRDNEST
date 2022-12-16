//Component to draw the drone map
import React, { useEffect } from "react";
import Drone from "../interfaces/Drone_interface";

interface DroneMapProps {
    drone: Drone;
}

const DroneMap = (props: DroneMapProps) => {

    useEffect(() => {
        //This is mainly a sanity check to see the drone and its location in the NDZ
        const drawDistance = () => {
          let c = document.getElementById(props.drone.id) as HTMLCanvasElement;
          let ctx = c.getContext("2d");
          if (ctx) {
            ctx.clearRect(0, 0, c.width, c.height);
    
            // Draw the drone as a red circle
            ctx.beginPath();
            ctx.arc(props.drone.positionX/1000, props.drone.positionY/1000, 5, 0, 2 * Math.PI);
            ctx.fillStyle = "red";
            ctx.fill();
            ctx.closePath();
    
            // Calculate the center of the canvas
            let centerX = c.width / 2;
            let centerY = c.height / 2;
            // Draw the NDZ circle in the middle of the red circle
            ctx.beginPath();
            ctx.arc(centerX, centerY, 100, 0, 2 * Math.PI);
            ctx.strokeStyle = "black";
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.closePath();
            // Draw the green circle in the middle of the yellow circle, that shows the location of the bird
            ctx.beginPath();
            ctx.arc(centerX, centerY, 3, 0, 2 * Math.PI);
            ctx.fillStyle = "blue";
            ctx.fill();
            ctx.closePath();
          }
        };
        drawDistance();
      }, [props.drone.positionX, props.drone.positionY, props.drone.id]);

    return (
        <div className="border-2 border-black">
                    <div className="bg-black">
              <p className="text-white text-center">{props.drone.id} - {props.drone?.pilot?.firstName} {props.drone?.pilot?.lastName} </p>
            </div>
        <p></p>
        <canvas id={props.drone.id} width="500" height="500">
            Your browser does not support the HTML5 canvas tag.
        </canvas>
        </div>
    );

}

export default DroneMap;
