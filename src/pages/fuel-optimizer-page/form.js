import { useAuth0 } from "@auth0/auth0-react";
import { getFuelPlan } from "api";
import LocationSearcher from "components/location-searcher/location-searcher";
import TractorSearcher from "components/tractor-searcher/tractor-searcher";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Form = ({ setFuelPlan }) => {
  const { user } = useAuth0();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    via: [],
    tractorFuel: "1",
    tractor: null,
  });

  const getFuelPlanHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await getFuelPlan({
        customer: user["https://ifuelsmart.com/company"],
        origin: formData.origin,
        destination: formData.destination,
        via: formData.via.length ? formData.via[0].location : "",
        tractorFuel: formData.tractorFuel,
        tractorFuelCapacity: formData.tractor.gal_capacity,
      });
      setLoading(false);
      setFuelPlan({
        ...data,
        fuelPurchaseLocations: data.fuelPurchaseLocations.filter((fpl) => fpl.include),
        tractor: formData.tractor,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const addVia = () => {
    setFormData((prevState) => ({ ...prevState, via: [...prevState.via, { id: uuidv4(), location: "" }] }));
  };

  const removeVia = (id) => {
    const inputs = [...formData.via];
    inputs.splice(
      inputs.findIndex((input) => input.id === id),
      1
    );
    setFormData((prevState) => ({ ...prevState, via: inputs }));
  };

  return (
    <form
      className="px-5 py-5 flex flex-col h-full flex-shrink-0 overflow-y-auto"
      onSubmit={getFuelPlanHandler}
      autoComplete="off"
    >
      {/* Tractor Searcher */}
      <TractorSearcher
        onTractorSelect={(tractor) => {
          if (!tractor) return setFormData((prevState) => ({ ...prevState, tractorFuel: "1", tractor: null }));
          setFormData((prevState) => ({ ...prevState, tractor }));
        }}
      />
      {/* Tractor Fuel */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="tractorFuel">
          Tractor Fuel ({formData.tractor ? `${formData.tractorFuel} gallons` : "Select truck first"})
        </label>
        <input
          type="range"
          placeholder="Enter origin location"
          min="1"
          max={formData.tractor ? formData.tractor.gal_capacity : "1"}
          value={formData.tractorFuel}
          onChange={(e) => setFormData((prevState) => ({ ...prevState, tractorFuel: e.target.value }))}
          className="block w-full"
          disabled={!formData.tractor}
        />
      </div>
      {/* Origin */}
      <LocationSearcher
        label="Origin"
        placeholder="Enter origin location"
        onSuggestSelect={(location) => {
          if (!location) return setFormData((prevState) => ({ ...prevState, origin: "" }));
          setFormData((prevState) => ({ ...prevState, origin: location.description }));
        }}
      />
      {/* Via */}
      <button
        type="button"
        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded w-full mb-4"
        onClick={addVia}
        disabled={formData.via.length === 1}
      >
        Add Stop
      </button>
      {formData.via.map((via, i) => (
        <div key={via.id} className="flex">
          <LocationSearcher
            label=""
            placeholder="Enter stop location"
            onSuggestSelect={(location) => {
              if (!location) {
                return setFormData((prevState) => ({
                  ...prevState,
                  via: prevState.via.map((v) => {
                    if (v.id === via.id) v.location = "";
                    return v;
                  }),
                }));
              }

              setFormData((prevState) => ({
                ...prevState,
                via: prevState.via.map((v) => {
                  if (v.id === via.id) {
                    v.location = location.description;
                  }
                  return v;
                }),
              }));
            }}
          />
          <div
            className="bg-red-500 text-white flex items-center h-[38px] mt-2 px-4 rounded-sm cursor-pointer"
            onClick={() => removeVia(via.id)}
          >
            X
          </div>
        </div>
      ))}
      {/* Destination */}
      <LocationSearcher
        label="Destination"
        placeholder="Enter destination location"
        onSuggestSelect={(location) => {
          if (!location) return setFormData((prevState) => ({ ...prevState, destination: "" }));
          setFormData((prevState) => ({ ...prevState, destination: location.description }));
        }}
      />
      <button
        type="submit"
        className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded w-full mt-auto"
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
          "Generate Fuel Plan"
        )}
      </button>
    </form>
  );
};

export default Form;
