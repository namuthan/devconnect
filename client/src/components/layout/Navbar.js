import React, { Component } from "react";
import { Input, Menu } from "semantic-ui-react";

import { NavButton, MenuItem } from "../reuseable";

import logo from "../../img/deal.png";
import "./NavBar.css";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { fixed: true, activeItem: "home" };
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick = (e, { name }) => {
    console.log(name);
    this.setState({ activeItem: name });
  };

  render() {
    const { fixed, activeItem } = this.state;

    return (
      <Menu stackable>
        <Menu.Item
          name="logo"
          active={activeItem === "logo"}
          onClick={this.handleItemClick}
        >
          <img src={logo} alt="app logo" />
        </Menu.Item>

        <MenuItem
          path="/"
          name="devhub"
          title="Devhub"
          active={activeItem === "devhub"}
          onClick={this.handleItemClick}
        />

        <MenuItem
          path="/developers"
          name="developers"
          title="Developers"
          active={activeItem === "developers"}
          onClick={this.handleItemClick}
        />

        <Menu.Menu position="right">
          <Menu.Item>
            <Input className="icon" icon="search" placeholder="Search devhub" />
          </Menu.Item>

          <Menu.Item position="right">
            <NavButton
              path="/login"
              name="Login"
              active={activeItem === "login"}
              fixed={fixed}
              color={"orange"}
            />

            <NavButton
              path="/register"
              name="Register"
              active={activeItem === "register"}
              fixed={fixed}
              color={"teal"}
            />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default Navbar;
