import DashboardLayout from "components/layouts/dashboard-layout";
import { Switch, Route } from "react-router-dom";

const AuthApp = () => {
  return (
    <DashboardLayout>
      <Switch>
        <Route path="/" component={() => <h1>Auth App</h1>} />
      </Switch>
    </DashboardLayout>
  );
};

export default AuthApp;
