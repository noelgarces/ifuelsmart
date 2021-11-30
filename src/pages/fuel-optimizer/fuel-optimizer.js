import FuelOptimizerLayout from "layouts/fuel-optimizer-layout";
import { useState } from "react";
import Form from "./form";
import FuelPlan from "./fuel-plan";
import Map from "components/map/map";
import Directions from "components/map/directions";

const FuelOptimzer = () => {
  const [fuelPlan, setFuelPlan] = useState(null);
  // console.log(fuelPlan);
  return (
    <>
      {!fuelPlan ? (
        <FuelOptimizerLayout leftPanel={<Form setFuelPlan={setFuelPlan} />} map={<Map />} />
      ) : (
        <FuelOptimizerLayout
          leftPanel={<FuelPlan fuelPlan={fuelPlan} setFuelPlan={setFuelPlan} />}
          map={
            <Map>
              <Directions origin={fuelPlan.origin} destination={fuelPlan.destination} />
            </Map>
          }
        />
      )}
    </>
  );
};

export default FuelOptimzer;
