import Input from "components/input/input";
import { useTractors } from "contexts/tractors-context";
import cn from "classnames";
import { useState } from "react";

const TractorSearcher = ({ onTractorSelect }) => {
  const [activeOption, setActiveOption] = useState(0);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [userInput, setUserInput] = useState("");
  const tractors = useTractors();

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
        <ul className="bg-gray-100 border absolute top-full w-full mt-1 rounded shadow z-10">
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
      <div className="relative">
        <Input label="Tractor" type="text" value={userInput} placeholder="Search Tractor" onChange={handleChange} />
        {optionList}
      </div>
    </>
  );
};

export default TractorSearcher;
