import { useAuth0 } from "@auth0/auth0-react";
import { getFuelPlan } from "api";
import Button from "components/button";
import LocationSearcher from "components/location-searcher/location-searcher";
import TractorSearcher from "components/tractor-searcher/tractor-searcher";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Form = ({ setFuelPlan }) => {
  const { user } = useAuth0();
  const [loading, setLoading] = useState(false);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [waypoints, setWaypoints] = useState([]);
  const [tractorFuel, setTractorFuel] = useState("1");
  const [tractor, setTractor] = useState(null);

  // Ref to reset child component state
  const tractorSearcherRef = useRef();

  const getFuelPlanHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await getFuelPlan({
        customer: user["https://ifuelsmart.com/company"],
        origin: origin,
        destination: destination,
        via: waypoints.length ? waypoints[0].location : "",
        tractorFuel: tractorFuel,
        tractorFuelCapacity: tractor.tank_capacity,
      });
      setLoading(false);
      setFuelPlan({
        ...data,
        fuelPurchaseLocations: data.fuelPurchaseLocations.filter((fpl) => fpl.include),
        tractor: tractor,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const addVia = () => setWaypoints((prevState) => [...prevState, { id: uuidv4(), location: "" }]);

  const removeVia = (id) => {
    const inputs = [...waypoints];
    inputs.splice(
      inputs.findIndex((input) => input.id === id),
      1
    );
    setWaypoints(inputs);
  };

  const resetAll = () => {
    setOrigin("");
    setDestination("");
    setWaypoints([]);
    setTractorFuel("1");
    setTractor(null);
    tractorSearcherRef.current.resetTractorSearcherState();
  };

  console.log(tractor);

  return (
    <form
      className="px-5 py-5 flex flex-col h-full flex-shrink-0 overflow-y-auto"
      onSubmit={getFuelPlanHandler}
      autoComplete="off"
    >
      {/* Tractor Searcher */}
      <TractorSearcher
        ref={tractorSearcherRef}
        onTractorSelect={(tractor) => {
          if (!tractor) {
            setTractorFuel("1");
            setTractor(null);
            return;
          }
          setTractor(tractor);
        }}
      />
      {/* Tractor Fuel */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="tractorFuel">
          Tractor Fuel ({tractor ? `${tractorFuel} gallons` : "Select truck first"})
        </label>
        <input
          type="range"
          placeholder="Enter origin location"
          min="1"
          max={tractor ? tractor.gal_capacity : "1"}
          value={tractorFuel}
          onChange={(e) => setTractorFuel(e.target.value)}
          className="block w-full"
          disabled={!tractor}
        />
      </div>
      {/* Origin */}
      <LocationSearcher
        label="Origin"
        placeholder="Enter origin location"
        initialValue={origin}
        onSuggestSelect={(location) => {
          if (!location) return setOrigin("");
          setOrigin(location.description);
        }}
      />
      {/* Via */}
      <button
        type="button"
        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded w-full mb-4"
        onClick={addVia}
        disabled={waypoints.length === 1}
      >
        Add Stop
      </button>
      {waypoints.map((waypoint, i) => (
        <div key={waypoint.id} className="flex">
          <LocationSearcher
            label=""
            placeholder="Enter stop location"
            onSuggestSelect={(location) => {
              if (!location) {
                setWaypoints((prevState) =>
                  prevState.map((wp) => {
                    if (wp.id === waypoint.id) wp.location = "";
                    return wp;
                  })
                );
                return;
              }

              setWaypoints((prevState) =>
                prevState.map((wp) => {
                  if (wp.id === waypoint.id) wp.location = location.description;
                  return wp;
                })
              );
            }}
          />
          <div
            className="bg-red-500 text-white flex items-center h-[38px] mt-2 px-4 rounded-sm cursor-pointer"
            onClick={() => removeVia(waypoint.id)}
          >
            X
          </div>
        </div>
      ))}
      {/* Destination */}
      <LocationSearcher
        label="Destination"
        placeholder="Enter destination location"
        initialValue={destination}
        onSuggestSelect={(location) => {
          if (!location) return setDestination("");
          setDestination(location.description);
        }}
      />
      {/* Actions */}
      <div className="flex space-x-3 mt-auto">
        <Button variant="lightGray" type="button" onClick={resetAll}>
          Reset
        </Button>
        <button
          type="submit"
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Processing
            </>
          ) : (
            "Get Fuel Plan"
          )}
        </button>
      </div>
    </form>
  );
};

export default Form;
