import { Switch, Route } from "react-router-dom";

const AuthApp = () => {
  return (
    <Switch>
      <Route path="/" component={() => <h1>Auth App</h1>} />
    </Switch>
  );
};

export default AuthApp;
