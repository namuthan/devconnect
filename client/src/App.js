import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";

import "./App.css";

import { Navbar, Footer, Page404, Landing } from "./components/layout";
import { Login, Register } from "./components/auth";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

// update the state with the current user(if exists ) on every page refresh
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  //check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // logout user
    store.dispatch(logoutUser);
    // TODO: Clear current profile
    // Redirect to login
    window.location.href = "/login";
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
