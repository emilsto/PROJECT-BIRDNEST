import Drone from "../interfaces/Drone_interface";

interface DroneCardProps {
  drone: Drone;
}

const TD_CSS = "pr-4"

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
    <tr className="hover:bg-slate-200 border-y-2 border-black">
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
