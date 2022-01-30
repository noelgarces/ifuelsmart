import { DirectionsRenderer } from "@react-google-maps/api";
import { useEffect, useState } from "react";

const Directions = ({ origin, via, destination, stops, travelMode }) => {
  const [directions, setDirections] = useState();

  useEffect(() => {
    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: new window.google.maps.LatLng(origin.lat, origin.lng),
        destination: new window.google.maps.LatLng(destination.lat, destination.lng),
        waypoints: via
          ? [
              {
                location: via,
                stopover: false,
              },
            ]
          : [],
        travelMode: "DRIVING",
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) setDirections(result);
        else console.error(`error fetching directions ${result}`);
      }
    );
  }, [origin, via, destination, stops, travelMode]);

  return <>{directions && <DirectionsRenderer directions={directions} />}</>;
};

export default Directions;
