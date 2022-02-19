import axios from "axios";

const apiAxios = axios.create({
  baseURL: "https://ifuelsmart.azurewebsites.net/api",
  params: {
    code: "rhXDiUskAktQGujvQvFybEiH7BNu6cN35iifH/jzIuMRVDRTEsXu3Q==",
  },
});

const getTractors = () =>
  axios.get(
    "https://ifuelsmart.azurewebsites.net/api/unitLst?code=NiNlstSwNN9rdLsxl/uhydztkywp0wHRvvIp69LbsjiNIrHxvSKYEA==&rtype=plist"
  );

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

const getFuelLocations = (companyId) =>
  axios.get("https://ifuelsmart.azurewebsites.net/api/IFSFuelStations", {
    params: {
      code: "gWZpM07he5aIdDTYaTsiCIjLB6v9k4yctmjWbvuiGNRonpcU5apO1g==",
      customer: companyId,
    },
  });

const updateFuelLocation = (id, status) =>
  axios.get(`https://ifuelsmart.azurewebsites.net/api/ifs_uFuelStation`, {
    params: {
      code: "a5iJtkQSaL9e35RDLKTbBydzGIrbunlzAZlXcPzZDtHkTPmOJa46PA==",
      id,
      switch: status,
    },
  });

const getTractorsTable = (customerId) =>
  axios.post(
    "https://ifuelsmart.azurewebsites.net/api/unitLst?code=NiNlstSwNN9rdLsxl/uhydztkywp0wHRvvIp69LbsjiNIrHxvSKYEA==",
    { customer: customerId, action: "get" }
  );

// Not using temp
const updateTractorStatus = (customer, tractorId, status) =>
  axios.post(
    "https://ifuelsmart.azurewebsites.net/api/unitLst?code=NiNlstSwNN9rdLsxl/uhydztkywp0wHRvvIp69LbsjiNIrHxvSKYEA==",
    { customer, unit: tractorId, status, action: "patch" }
  );

// creates and updates
const createTractor = (customer, tractorData) =>
  axios.post(
    "https://ifuelsmart.azurewebsites.net/api/unitLst?code=NiNlstSwNN9rdLsxl/uhydztkywp0wHRvvIp69LbsjiNIrHxvSKYEA==",
    {
      customer,
      action: "post",
      ...tractorData,
    }
  );

const deleteTractor = (customer, id) =>
  axios.post(
    "https://ifuelsmart.azurewebsites.net/api/unitLst?code=NiNlstSwNN9rdLsxl/uhydztkywp0wHRvvIp69LbsjiNIrHxvSKYEA==",
    {
      customer,
      id,
      action: "delete",
    }
  );

export {
  getTractors,
  getFuelPlan,
  sendMessage,
  getFuelLocations,
  getTractorsTable,
  updateFuelLocation,
  updateTractorStatus,
  createTractor,
  deleteTractor,
};
