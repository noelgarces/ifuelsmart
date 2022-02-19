import { useAuth0 } from "@auth0/auth0-react";
import { createTractor, deleteTractor, getTractorsTable } from "api";
import Button from "components/button";
import Input from "components/input/input";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { TabulatorFull as Tabulator } from "tabulator-tables";

const FuelLocationsPage = () => {
  const { user } = useAuth0();
  const [tractors, setTractors] = useState([]);
  const [selectedTractor, setSelectedTractor] = useState({
    id: null,
    unit_number: "",
    email_address: "",
    tank_capacity: "",
    status: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const tabulatorContainer = useRef();
  const tabulator = useRef();

  console.log(selectedTractor);

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
        { title: "Id", field: "id" },
        {
          title: "Unit Number",
          field: "unit_number",
          headerFilter: "input",
          headerFilterPlaceholder: "Enter unit number",
        },
        { title: "Email", field: "email_address" },
        { title: "Tank Capacity", field: "tank_capacity" },
        {
          title: "Status",
          field: "status",
          formatter: "tickCross",
          editor: true,
          editable: true,
        },
        {
          width: 75,
          hozAlign: "center",
          formatter: () => "Edit",
          cellClick: (e, cell) => {
            setSelectedTractor(cell.getRow().getData());
            setIsModalOpen(true);
          },
        },
        {
          width: 75,
          hozAlign: "center",
          formatter: () => "Delete",
          cellClick: async (e, cell) => {
            const rowData = cell.getData();
            const confirmDelete = window.confirm(`Are you sure you want to delete tractor ${rowData.unit_number}`);
            if (confirmDelete) {
              const res = await deleteTractor(user["https://ifuelsmart.com/company"], rowData.id);
              if (res.status === 200) cell.getRow().delete();
            }
          },
        },
      ],
    });
  }, [user, loading, tractors]);

  async function handleModalFormSubmit(e) {
    e.preventDefault();
    // update
    if (selectedTractor) {
      const { data } = await createTractor(user["https://ifuelsmart.com/company"], selectedTractor);
      console.log(data);
    }
    // create
  }

  return (
    <>
      {isModalOpen && (
        <div className="absolute bg-[rgba(0,0,0,0.5)] inset-0 z-10 grid place-items-center">
          <div className="bg-white w-full max-w-sm p-5 shadow-lg rounded-sm">
            <form onSubmit={handleModalFormSubmit}>
              <div className="flex justify-between items-center mb-4">
                <div className="font-semibold text-lg">{selectedTractor ? "Edit Tractor" : "Create Tractor"}</div>
                <button
                  type="button"
                  className="font-medium text-xl cursor-pointer"
                  onClick={() => {
                    setSelectedTractor({
                      id: null,
                      unit_number: "",
                      email_address: "",
                      tank_capacity: "",
                      status: false,
                    });
                    setIsModalOpen(false);
                  }}
                >
                  x
                </button>
              </div>
              <Input
                label="Unit Number"
                placeholder="Unit Number"
                value={selectedTractor.unit_number}
                onChange={(e) => setSelectedTractor((prevState) => ({ ...prevState, unit_number: e.target.value }))}
              />
              <Input
                label="Email"
                placeholder="Email"
                value={selectedTractor.email_address}
                onChange={(e) => setSelectedTractor((prevState) => ({ ...prevState, email_address: e.target.value }))}
              />
              <Input
                label="Tank Capacity"
                placeholder="Tank Capacity"
                value={selectedTractor.tank_capacity}
                onChange={(e) => setSelectedTractor((prevState) => ({ ...prevState, tank_capacity: e.target.value }))}
              />
              <Input
                label="Status"
                type="checkbox"
                placeholder="Status"
                checked={selectedTractor.status}
                onChange={(e) => setSelectedTractor((prevState) => ({ ...prevState, status: e.target.checked }))}
                className="!w-min"
              />
              <Button type="submit">Create Truck</Button>
            </form>
          </div>
        </div>
      )}
      <div ref={tabulatorContainer}></div>
    </>
  );
};

export default FuelLocationsPage;
