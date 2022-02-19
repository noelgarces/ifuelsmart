import { useAuth0 } from "@auth0/auth0-react";
import * as api from "api";
import Button from "components/button";
import { useCallback, useEffect, useMemo, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { useFilters, useTable } from "react-table";
import ColumnFilter from "./column-filter";
import ModalForm from "./modal-form";
// import styles from "./tractors-page.module.css";

const INIT_TRACTOR_DATA = {
  id: null,
  unit_number: "",
  email_address: "",
  tank_capacity: "",
  status: false,
};

export default function TractorsPage() {
  const { user } = useAuth0();
  const [tractors, setTractors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tractorData, setTractorData] = useState(INIT_TRACTOR_DATA);

  const defaultColumn = useMemo(() => ({ Filter: <></> }), []);

  const columns = useMemo(
    () => [
      { Header: "Id", accessor: "id" },
      { Header: "Unit Number", accessor: "unit_number", Filter: ColumnFilter },
      { Header: "Email Address", accessor: "email_address" },
      { Header: "Tank Capactiy", accessor: "tank_capacity" },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) =>
          value ? (
            <span className="p-2 bg-green-100 rounded">Enabled</span>
          ) : (
            <span className="p-2 bg-red-100 rounded">Disabled</span>
          ),
      },
    ],
    []
  );

  const data = useMemo(() => [...tractors], [tractors]);

  function tableHooks(hooks) {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "actions",
        Header: "Actions",
        Cell: ({ row }) => {
          async function handleEditClick(data) {
            setTractorData(data);
            setIsModalOpen(true);
          }

          async function handleDeleteClick(data) {
            const confirmDelete = window.confirm(`Are you sure you want to delete tractor ${data.unit_number}`);
            if (confirmDelete) {
              const res = await api.deleteTractor(user["https://ifuelsmart.com/company"], data.id);
              if (res.status === 200) getAndSetTractors();
              else window.alert("Failed to delete tractor");
            }
          }

          return (
            <div className="flex space-x-4 text-center">
              <button onClick={() => handleEditClick(row.original)}>
                <MdEdit />
              </button>
              <button onClick={() => handleDeleteClick(row.original)}>
                <MdDelete />
              </button>
            </div>
          );
        },
      },
    ]);
  }

  const tableInstance = useTable({ columns, data, defaultColumn }, useFilters, tableHooks);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  function resetTractorData() {
    setTractorData(INIT_TRACTOR_DATA);
  }

  const getAndSetTractors = useCallback(async () => {
    try {
      const { data } = await api.getTractorsTable(user["https://ifuelsmart.com/company"]);
      setTractors(data);
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  useEffect(() => getAndSetTractors(), [getAndSetTractors]);

  return (
    <>
      {isModalOpen && (
        <ModalForm
          getAndSetTractors={getAndSetTractors}
          tractorData={tractorData}
          setTractorData={setTractorData}
          resetTractorData={resetTractorData}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      <div className="h-full flex flex-col">
        {/* Actions */}
        <div className="flex justify-end mb-4">
          <Button type="button" className="!w-max" onClick={() => setIsModalOpen(true)}>
            Add New Tractor
          </Button>
        </div>
        {/* Table */}
        <div className="overflow-y-auto flex-1">
          <div className="overflow-x-auto">
            <div className="align-middle inline-block min-w-full">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className={"relative min-w-full divide-y divide-gray-200"} {...getTableProps()}>
                  <thead className="bg-gray-50">
                    {headerGroups.map((headerGroup) => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                          <th
                            className="sticky top-0 group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            {...column.getHeaderProps()}
                          >
                            {column.render("Header")}
                            <div>{column.canFilter ? column.render("Filter") : null}</div>
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
                    {rows.map((row) => {
                      prepareRow(row);
                      return (
                        <tr {...row.getRowProps()}>
                          {row.cells.map((cell) => (
                            <td className="px-6 py-4 whitespace-nowrap" {...cell.getCellProps()}>
                              {cell.render("Cell")}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
