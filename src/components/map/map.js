import { GoogleMap } from "@react-google-maps/api";
import { memo, useCallback, useState } from "react";
import PropTypes from "prop-types";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 31.7619,
  lng: -106.485,
};

const Map = ({ children }) => {
  const [, setMap] = useState(null);

  const onLoad = useCallback((map) => setMap(map), []);

  const onUnmount = useCallback((map) => setMap(null), []);

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={7} onLoad={onLoad} onUnmount={onUnmount}>
      {/* Child components, such as markers, info windows, etc. */}
      {children}
    </GoogleMap>
  );
};

Map.defaultProps = {
  children: <></>,
};

Map.propTypes = {
  children: PropTypes.node,
};

export default memo(Map);
