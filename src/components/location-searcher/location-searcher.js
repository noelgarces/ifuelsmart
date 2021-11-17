import Geosuggest from "react-geosuggest";
import "./location-searcher.css";

const LocationSearcher = ({ label, placeholder, required, onSuggestSelect, initialValue }) => {
  return (
    <div className="relative mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
        {label}
      </label>
      <Geosuggest
        placeholder={placeholder || "Enter location"}
        autoComplete="off"
        country="us"
        types={["(regions)"]}
        required={required}
        ignoreTab
        ignoreEnter
        onSuggestSelect={(place) => onSuggestSelect(place)}
        initialValue={initialValue}
      />
    </div>
  );
};

export default LocationSearcher;
