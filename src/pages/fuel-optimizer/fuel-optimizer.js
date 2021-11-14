import { getFuelPlan } from "api";
import LocationSearcher from "components/location-searcher/location-searcher";
import TractorSearcher from "components/tractor-searcher/tractor-searcher";
import { useState } from "react";

const FuelOptimzer = () => {
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    via: "",
    tractorFuel: "",
    tractorFuelCapacity: "",
  });

  const getFuelPlanHandler = async (e) => {
    e.preventDefault();
    const { data } = await getFuelPlan({
      customer: "sk1",
      origin: "El Paso, TX",
      destination: "New York, NY",
      via: "",
      tractorFuel: "100",
      tractorFuelCapacity: "160",
    });
    console.log(data);
  };

  console.log(formData);

  return (
    <>
      {/* Cards */}
      <div className="grid grid-cols-12 gap-6 h-full">
        <div className="col-span-full sm:col-span-6 xl:col-span-3 bg-white shadow-lg rounded-sm border border-gray-200 h-full ">
          <form className="px-5 py-5 flex flex-col h-full" onSubmit={getFuelPlanHandler} autoComplete="off">
            {/* Tractor Searcher */}
            <TractorSearcher
              onTractorSelect={(tractor) => {
                console.log(tractor);
                if (!tractor)
                  return setFormData((prevState) => ({ ...prevState, tractorFuel: 0, tractorFuelCapacity: 0 }));
                setFormData((prevState) => ({ ...prevState, tractorFuelCapacity: tractor.gal_capacity }));
              }}
            />
            {/* Tractor Fuel */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="tractorFuel">
                Tractor Fuel
              </label>
              <input
                type="range"
                placeholder="Enter origin location"
                min="1"
                max="8"
                onChange={(e) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    tractorFuel: (e.target.value / 8) * prevState.tractorFuelCapacity,
                  }))
                }
                className="block w-full"
                disabled={!formData.tractorFuelCapacity}
              />
            </div>
            {/* Origin */}
            <LocationSearcher
              label="Origin"
              placeholder="Enter origin location"
              onSuggestSelect={(location) => console.log("HI", location)}
            />
            {/* Destination */}
            <LocationSearcher
              label="Destination"
              placeholder="Enter destination location"
              onSuggestSelect={(location) => console.log("HI", location)}
            />
            <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded w-full mt-auto">
              Generate Fuel Plan
            </button>
          </form>
        </div>
        <div className="col-span-full sm:col-span-6 xl:col-span-9 bg-white shadow-lg rounded-sm border border-gray-200 h-full">
          <div className="px-5 pt-5">
            <h1>Hello world</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default FuelOptimzer;
