import FuelOptimizerLayout from "layouts/fuel-optimizer-layout";
import { useState } from "react";
import FuelPlan from "./fuel-plan";
import Form from "./form";

const FuelOptimzer = () => {
  const [fuelPlan, setFuelPlan] = useState(null);

  const setFuelPlanHandler = (computedFuelPlan) => setFuelPlan(computedFuelPlan);

  console.log(fuelPlan);

  return (
    <FuelOptimizerLayout
      leftPanel={!fuelPlan ? <Form setFuelPlanHandler={setFuelPlanHandler} /> : <FuelPlan fuelPlan={fuelPlan} />}
      map={<h1>Hello world</h1>}
    />
  );
};

export default FuelOptimzer;
