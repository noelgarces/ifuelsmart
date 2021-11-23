import { Tab } from "@headlessui/react";
import cn from "classnames";
import Button from "components/button";
import { BiExit } from "react-icons/bi";
import { FaGasPump } from "react-icons/fa";
import { sendMessage } from "api";
import { useState } from "react";
const FuelPlan = ({ fuelPlan, setFuelPlan }) => {
  const [loading, setLoading] = useState(false);

  const sendFuelPlan = async () => {
    let message = "";
    fuelPlan.fuelPurchaseLocations.forEach((fpl, idx) => {
      message += `
      ${idx + 1}. ${fpl.location}:
      - ${
        fpl.fuelToPurchase === -99 ? "Fill up tractor at" : `Purchase ${fpl.fuelToPurchase} gallons at`
      } ${fpl.price.toLocaleString("en-US", { style: "currency", currency: "USD" })} / gal
      - Exit: ${fpl.interstate_exit}
      \n`;
    });

    setLoading(true);
    try {
      await sendMessage({
        to: "noel.garces08@gmail.com",
        subject: "Fuel Plan | ifuelsmart",
        body: message.replace(/[^\S\r\n]+/g, " "),
      });
      setFuelPlan(null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <Tab.Group>
        <Tab.List className="flex flex-initial">
          <Tab
            className={({ selected }) =>
              cn(
                "w-full py-2.5 text-sm font-medium border-b border-gray-200 focus:outline-none",
                selected ? "bg-orange-600 text-white" : "hover:bg-gray-100"
              )
            }
          >
            IFS Recommended
          </Tab>
          <Tab
            className={({ selected }) =>
              cn(
                "w-full py-2.5 text-sm font-medium border-b border-gray-200 focus:outline-none",
                selected ? "bg-orange-600 text-white" : " hover:bg-gray-100"
              )
            }
          >
            All Fuel Stations
          </Tab>
        </Tab.List>
        <Tab.Panels className="overflow-y-auto flex flex-col flex-auto">
          <Tab.Panel className="bg-white focus:outline-none">
            {fuelPlan.fuelPurchaseLocations.map((fpl, idx) => (
              <div key={idx} className="border-b last:border-0 px-5 py-3 text-sm">
                <div className="font-semibold mb-2">
                  {idx + 1}. {fpl.location}
                </div>
                <div className="flex items-center mb-2">
                  <FaGasPump className="text-red-900 mr-2" />
                  <span>
                    {fpl.fuelToPurchase === -99
                      ? `Fill up tractor at this location at `
                      : `Purchase ${fpl.fuelToPurchase} gallons at `}
                    <span className="bg-green-100 px-1 py-0.5 rounded">
                      {fpl.price.toLocaleString("en-US", { style: "currency", currency: "USD" })} / gal
                    </span>
                  </span>
                </div>
                <div className="flex items-center">
                  <BiExit className="mr-2" />
                  Take exit {fpl.interstate_exit}
                </div>
              </div>
            ))}
          </Tab.Panel>
          <Tab.Panel className="bg-white focus:outline-none">
            {fuelPlan.fuelStationOnRoute.data.map(([location, price], idx) => (
              <div key={idx} className="border-b last:border-0 px-5 py-3 text-sm">
                <div className="font-semibold">
                  {idx + 1}. {location}
                </div>
                <div className="flex items-center mb-2">
                  <FaGasPump className="text-red-900 mr-2" />
                  <div>
                    Fuel price at this location is{" "}
                    <span className="bg-green-100 px-1 py-0.5 rounded">
                      {price.toLocaleString("en-US", { style: "currency", currency: "USD" })} / gal
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      <div className="border-t flex-0 px-5 flex items-center space-x-3" style={{ flex: "0 0 60px" }}>
        <Button variant="lightGray" onClick={() => setFuelPlan(null)}>
          Back
        </Button>
        <Button loading={loading} onClick={sendFuelPlan}>
          Send Fuel Plan
        </Button>
      </div>
    </div>
  );
};

export default FuelPlan;
