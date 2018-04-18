import React from "react";
import { Menu } from "semantic-ui-react";
import { Route } from "react-router-dom";

const MenuItem = props => (
  <Route
    render={({ history }) => (
      <Menu.Item
        name={props.name}
        active={props.active}
        onClick={(e, a) => {
          history.push(props.path);
          props.onClick(e, a);
        }}
      >
        {props.title}
      </Menu.Item>
    )}
  />
);

export default MenuItem;
