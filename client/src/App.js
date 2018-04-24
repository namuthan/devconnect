import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";

import "./App.css";

import { Navbar, Footer, Page404, Landing } from "./components/layout";
import { Dashboard } from "./components/dashboard";
import { Login, Register } from "./components/auth";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";
import PrivateRoute from "./components/reuseable/PrivateRoute";
import CreateProfile from "./components/createProfile/CreateProfile";

// update the state with the current user(if exists ) on every page refresh
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  //check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Clear current profile
    store.dispatch(clearCurrentProfile);
    // Logout user
    store.dispatch(logoutUser);
    // Redirect to login
    // window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Switch>
              <Route exact path="/" component={Landing} />
              {/* <div className="container"> */}
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />

              <Route path="*" component={Page404} />
              {/* </div> */}
            </Switch>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
