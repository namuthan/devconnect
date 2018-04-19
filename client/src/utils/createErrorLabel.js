import React from "react";
import { Label } from "semantic-ui-react";
import isEmpty from "./is-empty";

const createErrorLabel = (value, postion = "below") => {
  const err = !isEmpty(value) ? (
    <Label basic color="red" pointing={postion} style={{ width: "100%" }}>
      {value}
    </Label>
  ) : null;
  return err;
};

export default createErrorLabel;
