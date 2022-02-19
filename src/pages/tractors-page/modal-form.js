import { useAuth0 } from "@auth0/auth0-react";
import * as api from "api";
import Button from "components/button";
import Input from "components/input/input";
import { useState } from "react";

export default function Form({ getAndSetTractors, tractorData, setTractorData, resetTractorData, setIsModalOpen }) {
  const { user } = useAuth0();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      await api.createTractor(user["https://ifuelsmart.com/company"], tractorData);
      setIsModalOpen(false);

      // called here because it updates state from parent component
      resetTractorData();
      await getAndSetTractors();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleModalClose() {
    resetTractorData();
    setIsModalOpen(false);
  }

  function handleInputChange(e) {
    if (e.target.type === "checkbox") {
      setTractorData((prevState) => ({ ...prevState, [e.target.name]: e.target.checked }));
    } else {
      setTractorData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    }
  }

  return (
    <>
      <div className="absolute bg-[rgba(0,0,0,0.5)] inset-0 z-10 grid place-items-center">
        <div className="bg-white w-full max-w-sm p-5 shadow-lg rounded-sm">
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between items-center mb-4">
              <div className="font-semibold text-lg">{tractorData.id ? "Edit Tractor" : "Create Tractor"}</div>
              <button type="button" className="font-medium text-xl cursor-pointer" onClick={handleModalClose}>
                x
              </button>
            </div>
            <Input
              label="Unit Number"
              type="text"
              placeholder="Unit Number"
              name="unit_number"
              value={tractorData.unit_number}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Email"
              type="text"
              placeholder="Email"
              name="email_address"
              value={tractorData.email_address}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Tank Capacity"
              type="text"
              placeholder="Tank Capacity"
              name="tank_capacity"
              value={tractorData.tank_capacity}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Status"
              type="checkbox"
              placeholder="Status"
              className="!w-min"
              name="status"
              checked={tractorData.status}
              onChange={handleInputChange}
            />
            <Button type="submit">
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Processing
                </>
              ) : tractorData.id ? (
                "Update Tractor"
              ) : (
                "Create Tractor"
              )}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
