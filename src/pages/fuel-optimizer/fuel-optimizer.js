import FuelOptimizerLayout from "layouts/fuel-optimizer-layout";
import { useState } from "react";
import FuelPlan from "./fuel-plan";
import Form from "./form";

const FuelOptimzer = () => {
  const [fuelPlan, setFuelPlan] = useState(null);

  return (
    <>
      {!fuelPlan ? (
        <FuelOptimizerLayout leftPanel={<Form setFuelPlan={setFuelPlan} />} map={<h1>Hello world</h1>} />
      ) : (
        <FuelOptimizerLayout
          leftPanel={<FuelPlan fuelPlan={fuelPlan} setFuelPlan={setFuelPlan} />}
          map={<h1>Hello world</h1>}
        />
      )}
    </>
  );
};

export default FuelOptimzer;
