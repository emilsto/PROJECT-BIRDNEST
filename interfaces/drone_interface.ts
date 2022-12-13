//make the latestTrespassing and closestDistance nullable
//everything just id, positionX, positionY, positionZ, recordedAt are required

export default interface Drone {
    id: string;
    positionX: number;
    positionY: number;
    //for fun or future use
    positionZ: number;
    //save the time when the drone was recorded
    recordedAt: string;
    latestTrespassing: string | null;
    closestDistance: number | null; 
  }
  
