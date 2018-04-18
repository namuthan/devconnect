import React, { Component } from "react";
import "./App.css";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="containe">
          <Landing style={{ topPadding: "25px" }} />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
