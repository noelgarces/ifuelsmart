import { Tab } from "@headlessui/react";
import { FaGasPump } from "react-icons/fa";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example({ fuelPlan }) {
  return (
    <div className="flex flex-col h-full">
      <Tab.Group>
        <Tab.List className="flex flex-initial">
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full py-2.5 text-sm font-medium border-b border-gray-200 ",
                selected ? "bg-orange-600 text-white" : "hover:bg-gray-100"
              )
            }
          >
            IFS Recommended
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full py-2.5 text-sm font-medium border-b border-gray-200",
                selected ? "bg-orange-600 text-white" : " hover:bg-gray-100"
              )
            }
          >
            All Fuel Stations
          </Tab>
        </Tab.List>
        <Tab.Panels className="overflow-y-auto flex flex-col flex-auto">
          <Tab.Panel className={classNames("bg-white p-3")}>
            {fuelPlan.fuelPurchaseLocations.map(({ location, price }, idx) => (
              <div key={idx} className="border-b px-5 py-3 text-sm">
                <div className="font-semibold mb-2">{location}</div>
                <div className="flex items-center">
                  <FaGasPump className="text-red-900 mr-2" />
                  <span>
                    Fuel price at this location is{" "}
                    {price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </span>
                </div>
              </div>
            ))}
          </Tab.Panel>
          <Tab.Panel className={classNames("bg-white p-3")}>
            {fuelPlan.fuelStationOnRoute.data.map(([location, price], idx) => (
              <h3 key={idx} className="text-lg font-medium leading-5">
                {location}
              </h3>
            ))}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      <div className="bg-red-500 mt-auto flex-0" style={{ flex: "0 1 60px" }}>
        SOme actions here
      </div>
    </div>
  );
}
