import cn from "classnames";
import { useTractors } from "contexts/tractors-context";
import { forwardRef, useImperativeHandle, useState } from "react";

const TractorSearcher = forwardRef(({ onTractorSelect }, ref) => {
  const [activeOption, setActiveOption] = useState(0);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [userInput, setUserInput] = useState("");
  const tractors = useTractors();

  useImperativeHandle(ref, () => ({
    resetTractorSearcherState: () => {
      setActiveOption(0);
      setFilteredOptions([]);
      setShowOptions(false);
      setUserInput("");
    },
  }));

  const handleChange = (e) => {
    const filteredOptions = tractors.filter((option) => {
      return option.unit_number.toLowerCase().includes(e.currentTarget.value.toLowerCase());
    });
    setActiveOption(0);
    setFilteredOptions(filteredOptions);
    setShowOptions(true);
    setUserInput(e.currentTarget.value);
    if (!e.target.value) return onTractorSelect(null);
  };

  const handleClick = (option, e) => {
    setActiveOption(0);
    setFilteredOptions([]);
    setShowOptions(false);
    setUserInput(e.currentTarget.innerText);
    onTractorSelect(option);
  };

  let optionList;

  if (showOptions && userInput) {
    if (filteredOptions.length) {
      optionList = (
        <ul className="absolute top-full w-full mt-1 z-10 bg-gray-50 rounded-sm border border-gray-200">
          {filteredOptions.splice(0, 5).map((option, i) => {
            return (
              <li
                key={i}
                onClick={handleClick.bind(this, option)}
                className={cn("px-3 py-1 border-b cursor-pointer text-gray-900 hover:bg-gray-200", {
                  "font-semibold": i === activeOption,
                })}
              >
                {option.unit_number}
              </li>
            );
          })}
        </ul>
      );
    } else {
      optionList = (
        <div className="bg-gray-100 border absolute top-full w-full mt-1 rounded shadow px-3 py-1 text-gray-900 font-semibold">
          No truck was found
        </div>
      );
    }
  }

  return (
    <>
      <div className="relative mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
          Tractor
        </label>
        <input
          type="text"
          placeholder="Search Tractor"
          className="block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none"
          value={userInput}
          onChange={handleChange}
        />
        {optionList}
      </div>
    </>
  );
});

export default TractorSearcher;
