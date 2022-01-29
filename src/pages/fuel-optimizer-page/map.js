import { GoogleMap } from "@react-google-maps/api";
import PropTypes from "prop-types";

const Map = ({ children, onCenterChanged, center, onLoad }) => {
  return (
    <>
      <GoogleMap
        onLoad={onLoad}
        center={center}
        zoom={7}
        onDragEnd={onCenterChanged}
        mapContainerStyle={{ height: "100%", width: "100%" }}
      >
        {children}
      </GoogleMap>
    </>
  );
};

Map.defaultProps = {
  children: <></>,
};

Map.propTypes = {
  children: PropTypes.node,
};

export default Map;
