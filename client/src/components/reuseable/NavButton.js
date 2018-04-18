import React from "react";
import { Button } from "semantic-ui-react";
import { Route } from "react-router-dom";

const NavButton = props => (
  <Route
    render={({ history }) => (
      <Button
        color={props.color}
        name={props.name}
        active={props.active}
        inverted={!props.fixed}
        style={{ marginLeft: "0.5em" }}
        size={props.size}
        onClick={() => {
          history.push(props.path);
        }}
      >
        {props.name}
      </Button>
    )}
  />
);

export default NavButton;
