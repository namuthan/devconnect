import React from "react";
import { Segment, Dimmer, Loader, Label } from "semantic-ui-react";

const Spinner = ({ label, size, color }) => {
  return (
    <Segment style={{ height: "10em" }}>
      <Dimmer active inverted>
        <Loader size={size}>
          <Label color={color}>Loading Profile for {label}</Label>
        </Loader>
      </Dimmer>
    </Segment>
  );
};

export default Spinner;
