import React, { Component } from "react";
import { NavButton } from "../reuseable";
import { Card } from "semantic-ui-react";

export default class NoProfile extends Component {
  render() {
    console.log(this.props.avatar);
    return (
      <Card
        style={{ margin: "0 auto" }}
        image={this.props.avatar}
        header={this.props.name}
        meta={this.props.email}
        description="You have not yet setup profile, please add some inf"
        extra={
          <NavButton
            color="orange"
            path="/create-profile"
            name="Create Profile"
          />
        }
      />
    );
  }
}
