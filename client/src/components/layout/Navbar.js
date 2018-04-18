import React, { Component } from "react";
import { Input, Menu, Button } from "semantic-ui-react";

class Navbar extends Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu stackable>
        <Menu.Item>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-bYUFt2GoElBRIIbOMbXnN-CcjA2yuh8LyT6IRJYqAJArvkD2" />
        </Menu.Item>
        <Menu.Item
          name="Devhub"
          active={activeItem === "devhub"}
          onClick={this.handleItemClick}
        >
          Devhub
        </Menu.Item>

        <Menu.Item
          name="Developers"
          active={activeItem === "developers"}
          onClick={this.handleItemClick}
        >
          Developers
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item>
            <Input className="icon" icon="search" placeholder="Search devhub" />
          </Menu.Item>
          <Menu.Item
            name="signup"
            active={activeItem === "signup"}
            onClick={this.handleItemClick}
          >
            <Button>Log-in</Button>
          </Menu.Item>

          <Menu.Item
            name="signup"
            active={activeItem === "signup"}
            onClick={this.handleItemClick}
          >
            <Button primary>Register</Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default Navbar;
