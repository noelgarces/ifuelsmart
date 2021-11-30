import { DirectionsRenderer } from "@react-google-maps/api";
import { useState, useEffect } from "react";

const Directions = ({ origin, destination, stops, travelMode }) => {
  const [directions, setDirections] = useState();
  useEffect(() => {
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: new window.google.maps.LatLng(origin.lat, origin.lng),
        destination: new window.google.maps.LatLng(destination.lat, destination.lng),
        waypoints: stops
          ? [
              {
                location: new window.google.maps.LatLng(stops[0].coordinates.lat, stops[0].coordinates.lng),
                stopover: false,
              },
            ]
          : [],
        travelMode: "DRIVING",
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          console.log(result);
          setDirections(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }, [origin, destination, stops, travelMode]);

  // console.log(directions);
  return (
    <>
      <DirectionsRenderer directions={directions} />
    </>
  );
};

export default Directions;
