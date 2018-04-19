import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
  Icon,
  Divider
} from "semantic-ui-react";

import logo from "../../../img/deal.png";
import { registeruser } from "../../../actions/authActions";
import createErrorLabel from "../../../utils/createErrorLabel";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    this.props.registeruser(
      {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        password2: this.state.password2
      },
      this.props.history
    );
  }

  render() {
    const nameError = createErrorLabel(this.state.errors.name);
    const emailError = createErrorLabel(this.state.errors.email);
    const passwordError = createErrorLabel(this.state.errors.password);
    const password2Error = createErrorLabel(this.state.errors.password2);

    return (
      <div className="login-form">
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="orange" textAlign="center">
              <Image src={logo} /> Register your account
            </Header>
            <Form size="large">
              <Segment stacked>
                {nameError}
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Name"
                  value={this.state.name}
                  onChange={this.onChange}
                  name="name"
                />

                {emailError}
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail address"
                  value={this.state.email}
                  onChange={this.onChange}
                  name="email"
                />

                {passwordError}
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  name="password"
                />

                {password2Error}
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Confirm password"
                  type="password"
                  value={this.state.password2}
                  onChange={this.onChange}
                  name="password2"
                />
                <Button onClick={this.onSubmit} color="teal" fluid size="large">
                  Register
                </Button>
                <Divider horizontal>Or Register with</Divider>

                {/* registeration with social media */}
                <Button
                  color="linkedin"
                  style={{ width: "100%", marginTop: "1em" }}
                >
                  <Icon name="linkedin" /> LinkedIn
                </Button>
              </Segment>
            </Form>

            <Message>
              Already have account?{" "}
              <Link to="/login" style={{ color: "orange" }}>
                Login
              </Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

Register.propTypes = {
  registeruser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registeruser })(withRouter(Register));
