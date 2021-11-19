import { Tab } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example({ fuelPlan }) {
  console.log(fuelPlan);
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
            {fuelPlan.fuelStationOnRoute.data.map(([location, price]) => (
              <h3 className="text-lg mb-5 font-medium leading-5">{location}</h3>
            ))}
          </Tab.Panel>
          <Tab.Panel className={classNames("bg-white p-3")}>
            {fuelPlan.fuelStationOnRoute.data.map(([location, price]) => (
              <h3 className="text-lg font-medium leading-5">{location}</h3>
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
