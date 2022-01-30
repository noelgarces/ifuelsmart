import { InfoWindow, Marker } from "@react-google-maps/api";
import MarkerIcon from "assets/green-marker.png";

import Directions from "components/map/directions";
import FuelOptimizerLayout from "layouts/fuel-optimizer-layout";
import { useState } from "react";
import Form from "./form";
import FuelPlan from "./fuel-plan";
import Map from "./map";

const FuelOptimzer = () => {
  const [fuelPlan, setFuelPlan] = useState(null);
  const [mapRef, setMapRef] = useState(null);
  const [markerMap, setMarkerMap] = useState({});
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [infoOpen, setInfoOpen] = useState(false);
  const [center, setCenter] = useState({ lat: 31.7619, lng: -106.485 });

  const markerLoadHandler = (marker, location) => {
    return setMarkerMap((prevState) => ({ ...prevState, [location.loc_id]: marker }));
  };

  const markerClickHandler = (event, place) => {
    // Remember which place was clicked
    setSelectedPlace(place);

    // Required so clicking a 2nd marker works as expected
    if (infoOpen) setInfoOpen(false);

    setInfoOpen(true);
  };

  const loadHandler = (map) => {
    // Store a reference to the google map instance in state
    setMapRef(map);
  };

  const resetFuelPlan = () => {
    setFuelPlan(null);
    setMarkerMap({});
    setSelectedPlace(null);
    setInfoOpen(false);
    setCenter({ lat: 31.7619, lng: -106.485 });
  };

  return (
    <>
      <FuelOptimizerLayout
        leftPanel={
          !fuelPlan ? (
            <Form setFuelPlan={setFuelPlan} />
          ) : (
            <FuelPlan fuelPlan={fuelPlan} resetFuelPlan={resetFuelPlan} />
          )
        }
        map={
          <Map
            onLoad={loadHandler}
            center={center}
            onCenterChanged={() => {
              if (mapRef) setCenter(mapRef.getCenter().toJSON());
            }}
          >
            {fuelPlan && (
              <>
                <Directions origin={fuelPlan.origin} via={fuelPlan.directionsVia} destination={fuelPlan.destination} />
                {fuelPlan.fuelPurchaseLocations.map((location) => (
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
                      {/* <h3>{JSON.stringify(selectedPlace)}</h3> */}
                      <p className="font-medium">
                        {selectedPlace.fuelToPurchase === -99
                          ? "Fill up tractor at"
                          : `Purchase ${selectedPlace.fuelToPurchase} gallons at`}
                        &nbsp;
                        {selectedPlace.price.toLocaleString("en-US", { style: "currency", currency: "USD" })} / gal
                      </p>
                    </div>
                  </InfoWindow>
                )}
              </>
            )}
          </Map>
        }
      />
    </>
  );
};

export default FuelOptimzer;
// <MapTest
//   origin={fuelPlan.origin}
//   destination={fuelPlan.destination}
//   locations={fuelPlan.fuelPurchaseLocations}
// />
