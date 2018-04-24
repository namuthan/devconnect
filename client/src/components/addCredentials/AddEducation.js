import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Grid, Form, Segment, Checkbox, Button } from "semantic-ui-react";
import { connect } from "react-redux";

import createErrorLabel from "../../utils/createErrorLabel";
import Center from "../reuseable/Center";
import { addEducation } from "../../actions/profileActions";

class AddEducation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      school: "",
      degree: "",
      fieldofstudy: "",
      from: "",
      to: "",
      current: false,
      description: "",
      errors: {},
      disabled: false
    };

    this.onChange = this.onChange.bind(this);
    this.onChecked = this.onChecked.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e, data) {
    this.setState({
      [data.name]: data.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const newEdu = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    this.props.addEducation(newEdu, this.props.history);
  }

  onChecked() {
    this.setState({
      current: !this.state.current,
      disabled: !this.state.disabled
    });
  }

  render() {
    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      description,
      disabled
    } = this.state;

    const { errors } = this.state;
    console.log(JSON.stringify(this.state));
    const schoolError = createErrorLabel(errors.school);
    const degreeError = createErrorLabel(errors.degree);
    const fieldofstudyError = createErrorLabel(errors.fieldofstudy);
    const fromError = createErrorLabel(errors.from);
    const toError = createErrorLabel(errors.to);

    return (
      <Center>
        <Grid style={{ height: "100%" }} verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Link to="/dashboard" className="btn btn-light">
              Go Back
            </Link>
            <h1 className="display-4 text-center">Add Education</h1>

            <p className="lead text-center">
              Add any education that you have had in the past or current
            </p>
            <Form>
              <Segment stacked>
                <Form.Field required>
                  {schoolError}
                  <label style={{ textAlign: "left" }}>School</label>
                  <Form.Input
                    fluid
                    placeholder="School"
                    name="school"
                    type="text"
                    value={school}
                    onChange={this.onChange}
                  />
                </Form.Field>

                <Form.Field required>
                  {degreeError}
                  <label style={{ textAlign: "left" }}>Degree</label>
                  <Form.Input
                    fluid
                    placeholder="Degree"
                    name="degree"
                    type="text"
                    value={degree}
                    onChange={this.onChange}
                  />
                </Form.Field>

                <Form.Field>
                  {fieldofstudyError}
                  <label style={{ textAlign: "left" }}>Field Of Study</label>
                  <Form.Input
                    fluid
                    placeholder="Field Of Study"
                    name="fieldofstudy"
                    type="text"
                    value={fieldofstudy}
                    onChange={this.onChange}
                  />
                </Form.Field>

                <Form.Field required>
                  {fromError}
                  <label style={{ textAlign: "left" }}>From Date</label>
                  <Form.Input
                    fluid
                    placeholder="From"
                    name="from"
                    type="date"
                    value={from}
                    onChange={this.onChange}
                  />
                </Form.Field>

                <Form.Field>
                  {toError}
                  <label style={{ textAlign: "left" }}>To Date</label>
                  <Form.Input
                    fluid
                    placeholder="To"
                    name="to"
                    type="date"
                    value={to}
                    onChange={this.onChange}
                    disabled={disabled}
                  />
                </Form.Field>

                <Form.Field>
                  <Checkbox
                    style={{ textAlign: "left" }}
                    toggle
                    label="I am currently studying here"
                    onChange={this.onChecked}
                  />
                </Form.Field>

                <Form.Field>
                  <label style={{ textAlign: "left" }}>Description</label>
                  <Form.TextArea
                    placeholder="Description"
                    name="description"
                    type="text"
                    value={description}
                    onChange={this.onChange}
                  />
                </Form.Field>

                <Button
                  onClick={this.onSubmit}
                  color="orange"
                  fluid
                  size="large"
                >
                  Add Education
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </Center>
    );
  }
}

AddEducation.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addEducation: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { addEducation })(
  withRouter(AddEducation)
);
