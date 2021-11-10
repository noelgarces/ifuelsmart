import LandingPage from "pages/landing-page/landing-page";
import { Routes, Route } from "react-router-dom";

const UnAuthApp = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
    </Routes>
  );
};

export default UnAuthApp;
