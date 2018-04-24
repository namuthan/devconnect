import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Grid, Form, Segment, Checkbox, Button } from "semantic-ui-react";
import { connect } from "react-redux";

import createErrorLabel from "../../utils/createErrorLabel";
import Center from "../reuseable/Center";
import { addExperience } from "../../actions/profileActions";

class AddExperience extends Component {
  constructor(props) {
    super(props);

    this.state = {
      company: "",
      title: "",
      location: "",
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
    const newExperience = {
      company: this.state.company,
      title: this.state.title,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    this.props.addExperience(newExperience, this.props.history);
  }

  onChecked() {
    this.setState({
      current: !this.state.current,
      disabled: !this.state.disabled
    });
  }

  render() {
    const {
      company,
      title,
      location,
      from,
      to,
      description,
      disabled
    } = this.state;

    const { errors } = this.state;
    console.log(JSON.stringify(this.state));
    const companyError = createErrorLabel(errors.company);
    const titleError = createErrorLabel(errors.title);
    const fromError = createErrorLabel(errors.from);
    const toError = createErrorLabel(errors.to);

    return (
      <Center>
        <Grid style={{ height: "100%" }} verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Link to="/dashboard" className="btn btn-light">
              Go Back
            </Link>
            <h1 className="display-4 text-center">Add Experience</h1>

            <p className="lead text-center">
              Add any job or postion that you have had in the past or current
            </p>
            <Form>
              <Segment stacked>
                <Form.Field required>
                  {companyError}
                  <label style={{ textAlign: "left" }}>Company</label>
                  <Form.Input
                    fluid
                    placeholder="Company"
                    name="company"
                    type="text"
                    value={company}
                    onChange={this.onChange}
                  />
                </Form.Field>

                <Form.Field required>
                  {titleError}
                  <label style={{ textAlign: "left" }}>Title</label>
                  <Form.Input
                    fluid
                    placeholder="Title"
                    name="title"
                    type="text"
                    value={title}
                    onChange={this.onChange}
                  />
                </Form.Field>

                <Form.Field>
                  <label style={{ textAlign: "left" }}>Location</label>
                  <Form.Input
                    fluid
                    placeholder="Location"
                    name="location"
                    type="text"
                    value={location}
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
                    label="I am currently working here"
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
                  Add Experience
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </Center>
    );
  }
}

AddExperience.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addExperience: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { addExperience })(
  withRouter(AddExperience)
);
