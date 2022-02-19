import { useState } from "react";
import { useAsyncDebounce } from "react-table";

export default function ColumnFilter({ column }) {
  const { filterValue, setFilter } = column;
  const [value, setValue] = useState(filterValue);
  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 1000);

  return (
    <span>
      <input
        type="text"
        className="rounded border border-gray-400 h-6"
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
    </span>
  );
}
