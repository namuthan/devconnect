import React, { Component } from "react";
import { Input, Menu, Image, Dropdown } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";
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

  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  onProfileClick(e) {
    e.preventDefault();
  }

  render() {
    const { fixed, activeItem } = this.state;
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <Menu.Item position="right">
        <Dropdown
          item
          style={{ height: "25px" }}
          trigger={
            <span>
              <Image src={user.avatar} avatar /> {user.name}
            </span>
          }
        >
          <Dropdown.Menu>
            <Dropdown.Item
              icon="user"
              text="Profile"
              onClick={this.onProfileClick.bind(this)}
            />
            <Dropdown.Item
              icon="sign out"
              text="Logout"
              onClick={this.onLogoutClick.bind(this)}
            />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    );

    const guestLinks = (
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
    );

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
            <Input
              action={{ type: "submit", content: "Go" }}
              placeholder="Search devhub"
            />
          </Menu.Item>
          {isAuthenticated ? authLinks : guestLinks}
        </Menu.Menu>
      </Menu>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  clearCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(
  Navbar
);
