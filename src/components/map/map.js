/* global google */

import React from "react";
import { GoogleMap } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 31.7619,
  lng: -106.485,
};

function MyComponent() {
  console.log(google);
  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={7} onLoad={onLoad} onUnmount={onUnmount}>
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  );
}

export default React.memo(MyComponent);
