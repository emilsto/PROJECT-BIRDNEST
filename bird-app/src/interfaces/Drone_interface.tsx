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
    pilot : Pilot | null;
  }

interface Pilot {
    pilotId: string;
    firstName: string;
    lastName : string;
    phoneNumber : string;
    email: string;
}
