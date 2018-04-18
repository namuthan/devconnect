import Desktop from "./Desktop";
import Mobile from "./Mobile";
import PropTypes from "prop-types";

import React, { Component } from "react";

class Responsive extends Component {
  render() {
    return (
      <div>
        <Desktop>{this.children}</Desktop>
        <Mobile>{this.children}</Mobile>
      </div>
    );
  }
}

Responsive.propTypes = {
  children: PropTypes.node
};

export default Responsive;
