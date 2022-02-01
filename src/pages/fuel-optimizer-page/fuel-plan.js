import { Tab } from "@headlessui/react";
import { sendMessage } from "api";
import cn from "classnames";
import Button from "components/button";
import { useState } from "react";
import { BiExit } from "react-icons/bi";
import { FaGasPump } from "react-icons/fa";

const FuelPlan = ({ fuelPlan, resetFuelPlan }) => {
  const [loading, setLoading] = useState(false);

  const sendFuelPlan = async () => {
    let message = "";
    fuelPlan.fuelPurchaseLocations.forEach((fpl, idx) => {
      message += `
      ${idx + 1}. ${fpl.location}:
      - ${
        fpl.fuelToPurchase === -99 ? "Top off tractor at" : `Purchase ${fpl.fuelToPurchase} gallons at`
      } ${fpl.price.toLocaleString("en-US", { style: "currency", currency: "USD" })} / gal
      - Exit: ${fpl.interstate_exit}
      \n`;
    });

    setLoading(true);
    try {
      await sendMessage({
        to: fuelPlan.tractor.email_address,
        subject: "Fuel Plan",
        body: message.replace(/[^\S\r\n]+/g, " "),
      });
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
                "w-full py-2.5 text-sm font-medium border-b border-gray-100 focus:outline-none",
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
              <div key={idx} className="border-b border-gray-200 last:border-0 px-5 py-3 text-sm">
                <div className="font-semibold mb-2">
                  {idx + 1}. {fpl.location}
                </div>
                <div className="flex items-center mb-2">
                  <FaGasPump className="text-red-900 mr-2" />
                  <span>
                    {fpl.fuelToPurchase === -99
                      ? `Top off tractor at this location at `
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
              <div key={idx} className="border-b border-gray-200 last:border-0 px-5 py-3 text-sm">
                <div className="font-semibold mb-2">
                  {idx + 1}. {location}
                </div>
                <div className="flex items-center mb-2">
                  <FaGasPump className="text-red-900 mr-2" />
                  <span>
                    Fuel price at this location is{" "}
                    <span className="bg-green-100 px-1 py-0.5 rounded">
                      {price.toLocaleString("en-US", { style: "currency", currency: "USD" })} / gal
                    </span>
                  </span>
                </div>
              </div>
            ))}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      {/* <div className="border-t flex-0 px-5" style={{ flex: "0 0 60px" }}> */}
      <div className="border-t flex-0 bg-gray-50" style={{ flex: "0 0 auto" }}>
        {/* Summary */}
        <div className="border-b">
          {/* Row */}
          <div className="flex justify-between px-5 pt-3 mb-2">
            <div className="text-sm">
              <div className="text-gray-600">Distance</div>
              <div className="font-semibold ">{fuelPlan.totalTripDistanceMiles.toLocaleString()} Miles</div>
            </div>
            <div className="text-sm text-right">
              <div className="text-gray-600 ">Total Fuel</div>
              <div className="font-semibold ">{fuelPlan.totalFuelNeededGallons.toLocaleString()} Gallons</div>
            </div>
          </div>
          {/* Row */}
          <div className="flex justify-between px-5 pb-3">
            <div className="text-sm">
              <div className="text-gray-600">Fuel Purchase</div>
              <div className="font-semibold ">{fuelPlan.totalPurchaseNeededGallons.toLocaleString()} Gallons</div>
            </div>
            <div className="text-sm text-right">
              <div className="text-gray-600 ">Fuel Stops</div>
              <div className="font-semibold ">{fuelPlan.fuelPurchaseLocations.length}</div>
            </div>
          </div>
        </div>
        {/* Mail Details */}
        <div className="border-b">
          {/* Row */}
          <div className="flex justify-between px-5 py-3">
            <div className="text-sm">
              <div className="text-gray-600">Tractor</div>
              <div className="font-semibold ">{fuelPlan.tractor.unit_number}</div>
            </div>
            <div className="text-sm text-right">
              <div className="text-gray-600 ">Email</div>
              <div className="font-semibold ">{fuelPlan.tractor.email_address}</div>
            </div>
          </div>
        </div>
        {/* Actions */}
        <div className="flex items-center space-x-3 px-5 py-3">
          <Button variant="lightGray" onClick={resetFuelPlan}>
            Back
          </Button>
          <Button loading={loading} onClick={sendFuelPlan}>
            Send Fuel Plan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FuelPlan;
