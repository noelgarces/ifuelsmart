import DashboardLayout from "components/layouts/dashboard-layout";
import { Routes, Route } from "react-router-dom";

const AuthApp = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<h1>Auth App</h1>} />
      </Routes>
    </DashboardLayout>
  );
};

export default AuthApp;
