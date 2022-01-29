import React, { useState, Fragment } from "react";
import MarkerIcon from "assets/green-marker.png";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import Directions from "components/map/directions";

const MapTest = ({ locations, origin, destination }) => {
  // eslint-disable-next-line no-unused-vars
  const [mapRef, setMapRef] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [markerMap, setMarkerMap] = useState({});
  const [infoOpen, setInfoOpen] = useState(false);

  // Iterate myPlaces to size, center, and zoom map to contain all markers
  const fitBounds = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    locations.map((location) => {
      bounds.extend({ lat: location.lat, lng: location.lng });
      return location.loc_id;
    });
    map.fitBounds(bounds);
  };

  const loadHandler = (map) => {
    // Store a reference to the google map instance in state
    setMapRef(map);
    // Fit map bounds to contain all markers
    fitBounds(map);
  };

  // We have to create a mapping of our places to actual Marker objects
  const markerLoadHandler = (marker, location) => {
    return setMarkerMap((prevState) => {
      return { ...prevState, [location.loc_id]: marker };
    });
  };

  const markerClickHandler = (event, place) => {
    // Remember which place was clicked
    setSelectedPlace(place);

    // Required so clicking a 2nd marker works as expected
    if (infoOpen) {
      setInfoOpen(false);
    }

    setInfoOpen(true);
  };

  const renderMap = () => {
    return (
      <Fragment>
        <GoogleMap zoom={7} onLoad={loadHandler} mapContainerStyle={{ height: "100%", width: "100%" }}>
          <Directions origin={origin} destination={destination} />
          {locations.map((location) => (
            <Marker
              key={location.loc_id}
              position={{ lat: location.lat, lng: location.lng }}
              onLoad={(marker) => markerLoadHandler(marker, location)}
              onClick={(event) => markerClickHandler(event, location)}
              icon={{
                url: MarkerIcon,
                scaledSize: new window.google.maps.Size(30, 30),
              }}
            />
          ))}

          {infoOpen && selectedPlace && (
            <InfoWindow anchor={markerMap[selectedPlace.loc_id]} onCloseClick={() => setInfoOpen(false)}>
              <div>
                <h3>{selectedPlace.loc_id}</h3>
                <h3>{JSON.stringify(selectedPlace)}</h3>
                <div>This is your info window content</div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </Fragment>
    );
  };

  return renderMap();
};

export default MapTest;
