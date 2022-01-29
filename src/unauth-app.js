import LandingPage from "pages/landing-page/landing-page";
import { Routes, Route, Navigate } from "react-router-dom";

const UnAuthApp = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default UnAuthApp;
