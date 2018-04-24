import React, { Component } from "react";
import { Form, Segment, Grid, Dropdown } from "semantic-ui-react";
import { STATUSES as statuOptions } from "./countries";
import createErrorLabel from "../../utils/createErrorLabel";

export default class BasicInfo extends Component {
  isValidated() {
    return true;
  }

  render() {
    const { handle, company, errors, onChange, website, status } = this.props;

    const handleError = createErrorLabel(errors.handle);
    const statusError = createErrorLabel(errors.status);
    const websiteError = createErrorLabel(errors.website);

    return (
      <Grid
        textAlign="center"
        style={{ height: "100%" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Form>
            <Segment stacked>
              <Form.Field required>
                {handleError}
                <label style={{ textAlign: "left" }}>Profile Handle</label>
                <Form.Input
                  fluid
                  placeholder="Profile handle"
                  name="handle"
                  type="text"
                  value={handle}
                  onChange={onChange}
                />
              </Form.Field>

              <Form.Field required>
                {statusError}
                <label style={{ textAlign: "left" }}>Professional Status</label>
                <Dropdown
                  style={{ marginBottom: "14px" }}
                  placeholder="Select Professional Status"
                  fluid
                  selection
                  value={status}
                  onChange={onChange}
                  options={statuOptions}
                  name="status"
                />
              </Form.Field>

              <Form.Field>
                <label style={{ textAlign: "left" }}>Company</label>
                <Form.Input
                  fluid
                  placeholder="Company"
                  name="company"
                  type="text"
                  value={company}
                  onChange={onChange}
                />
              </Form.Field>

              <Form.Field>
                {websiteError}
                <label style={{ textAlign: "left" }}>Website</label>
                <Form.Input
                  fluid
                  placeholder="Website"
                  name="website"
                  type="text"
                  value={website}
                  onChange={onChange}
                />
              </Form.Field>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}
