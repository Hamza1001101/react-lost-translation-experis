import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "./App.css";

import Homepage from "./components/homepage/Homepage";

import UserProfilePage from "./components/profile/UserProfilePage";

import Translation from "./components/translations/Translation";

/**
 * The applications starts here...
 * @returns
 */
const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/homepage" />
          </Route>
          <Route path="/homepage" component={Homepage} />
          <Route path="/translate" component={Translation} />
          <Route path="/user-profile" component={UserProfilePage} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
