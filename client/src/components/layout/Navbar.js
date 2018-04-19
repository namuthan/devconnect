import React, { Component } from "react";
import { Input, Menu } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

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
    this.props.logoutUser();
  }

  render() {
    const { fixed, activeItem } = this.state;
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <Menu.Item position="right">
        <a
          href="/"
          onClick={this.onLogoutClick.bind(this)}
          className="nav-link"
          style={{ color: "orange" }}
        >
          <img
            className="rounded-circle"
            src={user.avatar}
            alt={user.name}
            style={{
              width: "25px",
              height: "25px",
              marginRight: "5px"
            }}
            title="You must have a Gravatar connected to your email to display an image"
          />{" "}
          Logout
        </a>
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
            <Input className="icon" icon="search" placeholder="Search devhub" />
          </Menu.Item>
          {isAuthenticated ? authLinks : guestLinks}
        </Menu.Menu>
      </Menu>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
