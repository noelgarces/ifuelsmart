import DashboardLayout from "layouts/dashboard-layout/dashboard-layout";
import FuelOptimzer from "pages/fuel-optimizer/fuel-optimizer";
import { TractorsProvider } from "contexts/tractors-context";
import { Routes, Route } from "react-router-dom";

const AuthApp = () => {
  return (
    <TractorsProvider>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<FuelOptimzer />} />
        </Routes>
      </DashboardLayout>
    </TractorsProvider>
  );
};

export default AuthApp;
