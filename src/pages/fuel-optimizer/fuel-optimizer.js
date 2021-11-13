import { getFuelPlan } from "api";
import LocationSearcher from "components/location-searcher/location-searcher";
import TractorSearcher from "components/tractor-searcher/tractor-searcher";

const FuelOptimzer = () => {
  const getFuelPlanHandler = async (e) => {
    e.preventDefault();
    const data = await getFuelPlan({
      customer: "sk1",
      origin: "El Paso, TX",
      destination: "New York, NY",
      via: "",
      tractorFuel: "100",
      tractorFuelCapacity: "160",
    });
    console.log(data);
  };
  return (
    <>
      {/* Cards */}
      <div className="grid grid-cols-12 gap-6 h-full">
        <div className="col-span-full sm:col-span-6 xl:col-span-3 bg-white shadow-lg rounded-sm border border-gray-200 h-full ">
          <form className="px-5 py-5 flex flex-col h-full" onSubmit={getFuelPlanHandler}>
            {/* Tractor Searcher */}
            <TractorSearcher onTractorSelect={(tractor) => console.log(tractor)} />
            {/* Tractor Fuel */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="tractorFuel">
                Tractor Fuel
              </label>
              <input type="range" min="1" max="8" placeholder="Enter origin location" className="block w-full" />
            </div>
            {/* Origin */}
            <LocationSearcher
              initialValue={""}
              label="Origin"
              placeholder="Enter origin location"
              onSuggestSelect={(location) => console.log("HI", location)}
            />
            {/* Destination */}
            <LocationSearcher
              label="Destination"
              initialValue={""}
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
