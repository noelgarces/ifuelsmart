import { useAuth0 } from "@auth0/auth0-react";
import { getTractorsTable, updateTractorStatus } from "api";

import React, { useEffect, useRef, useState } from "react";
import { TabulatorFull as Tabulator } from "tabulator-tables";

const FuelLocationsPage = () => {
  const [tractors, setTractors] = useState([]);
  const [loading, setLoading] = useState(true);
  const tabulatorContainer = useRef();
  const tabulator = useRef();
  const { user } = useAuth0();

  useEffect(() => {
    const getTractorsTableAsync = async () => {
      try {
        const { data } = await getTractorsTable(user["https://ifuelsmart.com/company"]);
        setTractors(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getTractorsTableAsync();
  }, [user]);

  useEffect(() => {
    tabulator.current = new Tabulator(tabulatorContainer.current, {
      height: "100%",
      placeholder: loading ? "Retrieving Tractors" : "No Tractors",
      layout: "fitColumns",
      selectable: false,
      data: tractors,
      columns: [
        { title: "Id", field: "vehicleid", headerFilter: "input", headerFilterPlaceholder: "Enter id" },
        { title: "Email", field: "emailAddress" },
        { title: "Tank Capacity", field: "tankCapacity" },
        {
          title: "Status",
          field: "flag",
          formatter: "tickCross",
          editor: true,
          editable: true,
        },
      ],
    });

    tabulator.current.on("cellEdited", async (cell) => {
      const data = cell.getData();
      await updateTractorStatus(user["https://ifuelsmart.com/company"], data.vehicleid, data.flag);
    });
  }, [user, loading, tractors]);

  return (
    <>
      <div ref={tabulatorContainer}></div>
    </>
  );
};

export default FuelLocationsPage;
