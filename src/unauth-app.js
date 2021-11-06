import LandingPage from "pages/landing-page/landing-page";
import { Switch, Route } from "react-router-dom";

const UnAuthApp = () => {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
    </Switch>
  );
};

export default UnAuthApp;
