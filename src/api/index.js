import axios from "axios";

const apiAxios = axios.create({
  baseURL: "https://ifuelsmart.azurewebsites.net/api",
  params: {
    code: "rhXDiUskAktQGujvQvFybEiH7BNu6cN35iifH/jzIuMRVDRTEsXu3Q==",
    // rtype: "plist",
  },
});

const getTractors = () => apiAxios.get("/ifuels", { params: { rtype: "plist" } });

const getFuelPlan = ({ customer, origin, destination, via, tractorFuel, tractorFuelCapacity }) =>
  apiAxios.get("/ifuels", {
    params: {
      rtype: "fuel",
      cust: customer,
      orig: origin,
      dest: destination,
      via: via,
      tanklvl: tractorFuel,
      fuel_capacity: tractorFuelCapacity,
    },
  });

export { getTractors, getFuelPlan };
