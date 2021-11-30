import { GoogleMap } from "@react-google-maps/api";
import { useCallback, useState } from "react";
import PropTypes from "prop-types";

const Map = ({ children }) => {
  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const center = {
    lat: 31.772543,
    lng: -106.460953,
  };

  const [, setMap] = useState(null);

  const onLoad = useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback((map) => {
    setMap(null);
  }, []);

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10} onLoad={onLoad} onUnmount={onUnmount}>
      {/* Child components, such as markers, info windows, etc. */}
      {children}
    </GoogleMap>
  );
};

Map.defaultProps = {
  children: null,
};

Map.propTypes = {
  children: PropTypes.node,
};

export default Map;
