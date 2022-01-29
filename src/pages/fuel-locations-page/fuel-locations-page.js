import { getFuelLocations, updateFuelLocation } from "api";
import React, { useEffect, useRef, useState } from "react";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import { useAuth0 } from "@auth0/auth0-react";

const FuelLocationsPage = () => {
  const [fuelLocations, setFuelLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const tabulatorContainer = useRef();
  const tabulator = useRef();
  const { user } = useAuth0();

  useEffect(() => {
    const getFuelLocationsAsync = async () => {
      try {
        const { data } = await getFuelLocations(user["https://ifuelsmart.com/company"]);
        setFuelLocations(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getFuelLocationsAsync();
  }, [user]);

  useEffect(() => {
    tabulator.current = new Tabulator(tabulatorContainer.current, {
      height: "100%",
      placeholder: loading ? "Retrieving Fuel Locations" : "No Fuel Locations",
      layout: "fitColumns",
      selectable: false,
      data: fuelLocations,
      columns: [
        { title: "Id", field: "id" },
        { title: "Store Number", field: "storeNumber" },
        { title: "Discounted Price", field: "discountedPrice" },
        { title: "City", field: "city" },
        { title: "State", field: "state" },
        {
          title: "Status",
          field: "status",
          formatter: "tickCross",
          editor: true,
          editable: true,
        },
      ],
    });

    tabulator.current.on("cellEdited", async (cell) => {
      const data = cell.getData();
      await updateFuelLocation(data.id, data.status === true ? 1 : 0);
    });
  }, [loading, fuelLocations]);

  return (
    <>
      <div ref={tabulatorContainer}></div>
    </>
  );
};

export default FuelLocationsPage;
