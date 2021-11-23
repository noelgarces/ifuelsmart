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

const sendMessage = (config) =>
  apiAxios.post("/iFsengr", config, { code: "Jj5faLSSjBMAks3FFdk2cJEhp567pmK8NiDLa0NL0N848Bo9gsBn/g==" });

export { getTractors, getFuelPlan, sendMessage };
