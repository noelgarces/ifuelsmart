import { useAuth0 } from "@auth0/auth0-react";
import IFrameDisplay from "components/iframe-display";
import { TractorsProvider } from "contexts/tractors-context";
import dashboardConfig from "dashboard-config";
import DashboardLayout from "layouts/dashboard-layout/dashboard-layout";
import FuelLocationsPage from "pages/fuel-locations-page/fuel-locations-page";
import FuelOptimzerPage from "pages/fuel-optimizer-page/fuel-optimizer-page";
import TractorsPage from "pages/tractors-page/tractors-page";
import { Route, Routes } from "react-router-dom";

const AuthApp = () => {
  const { user } = useAuth0();

  return (
    <TractorsProvider>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<FuelOptimzerPage />} />
          <Route path="/fuel-locations" element={<FuelLocationsPage />} />
          <Route path="/tractors" element={<TractorsPage />} />
          {/* Custom Features Routes */}
          {dashboardConfig[user["https://ifuelsmart.com/company"]].customFeatures.map((feature) => (
            <Route
              key={feature.route}
              path={feature.route}
              element={<IFrameDisplay url={feature.iframeUrl} name={feature.name} />}
            />
          ))}
        </Routes>
      </DashboardLayout>
    </TractorsProvider>
  );
};

export default AuthApp;
