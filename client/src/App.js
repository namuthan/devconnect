import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";

import { Navbar, Footer, Page404, Landing } from "./components/layout";
import { Login, Register } from "./components/auth";

class App extends Component {
  render() {
    return (
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
    );
  }
}

export default App;
