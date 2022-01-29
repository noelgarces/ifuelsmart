import { getTractors } from "api";
import { createContext, useState, useEffect, useContext } from "react";

const TractorsContext = createContext();

const useTractors = () => {
  const context = useContext(TractorsContext);
  if (context === "undefined") throw new Error("useTractors must be used within TractorsProvider");
  return context;
};

const TractorsProvider = ({ children }) => {
  const [tractors, setTractors] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const getTractorsAsync = async () => {
      try {
        const { data } = await getTractors();
        setTractors(data.unit_numbers);
      } catch (e) {
        console.log(e);
      } finally {
        setInitialLoading(false);
      }
    };
    getTractorsAsync();
  }, []);

  return (
    <TractorsContext.Provider value={tractors}>
      {!initialLoading && children}
      {initialLoading && (
        <div className="h-screen bg-gray-800 grid place-items-center text-white">
          <div className="flex flex-col items-center px-8 max-w-xs md:max-w-lg text-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-9 w-9"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <h2 className="text-xl font-semibold mt-3">Loading...</h2>
            <p className="mt-1">Retrieving tractor, please don't close this page.</p>
          </div>
        </div>
      )}
    </TractorsContext.Provider>
  );
};

export { TractorsProvider, useTractors };
