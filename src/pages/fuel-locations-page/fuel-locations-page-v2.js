import { useAuth0 } from "@auth0/auth0-react";
import ColumnFilter from "pages/tractors-page/column-filter";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useFilters, useTable } from "react-table";
import * as api from "api";

export default function FuelLocationsPage() {
  const { user } = useAuth0();
  const [fuelLocations, setFuelLocations] = useState([]);

  const defaultColumn = useMemo(() => ({ Filter: <></> }), []);

  const columns = useMemo(
    () => [
      { Header: "Id", accessor: "id" },
      { Header: "Store Number", accessor: "storeNumber" },
      { Header: "Discounted Price", accessor: "discountedPrice" },
      { Header: "City", accessor: "city", Filter: ColumnFilter },
      { Header: "State", accessor: "state", Filter: ColumnFilter },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) =>
          value ? (
            <span className="p-2 bg-green-100 rounded">Active</span>
          ) : (
            <span className="p-2 bg-red-100 rounded">Inactive</span>
          ),
      },
    ],
    []
  );

  const data = useMemo(() => [...fuelLocations], [fuelLocations]);

  function tableHooks(hooks) {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "toggle",
        Header: "Toggle",
        Cell: ({ row }) => {
          async function handleToggle(status, data) {
            await api.updateFuelLocation(data.id, status === true ? 1 : 0);
            await getAndSetFuelLocations();
          }

          return (
            <div className="text-center">
              <input
                type="checkbox"
                defaultChecked={row.original.status === 1 ? true : false}
                onChange={(e) => handleToggle(e.target.checked, row.original)}
              />
            </div>
          );
        },
      },
    ]);
  }

  const tableInstance = useTable({ columns, data, defaultColumn }, useFilters, tableHooks);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  const getAndSetFuelLocations = useCallback(async () => {
    try {
      const { data } = await api.getFuelLocations(user["https://ifuelsmart.com/company"]);
      setFuelLocations(data);
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  useEffect(() => getAndSetFuelLocations(), [getAndSetFuelLocations]);

  return (
    <div className="h-full flex flex-col">
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
  );
}
