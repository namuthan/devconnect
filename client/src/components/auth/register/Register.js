import React, { Component } from "react";
import axios from "axios";

import logo from "../../../img/deal.png";

import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
  Icon,
  Divider,
  Label
} from "semantic-ui-react";
import { Link } from "react-router-dom";

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
    this.isEmpty = this.isEmpty.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  isEmpty(value) {
    if (
      value === undefined ||
      value === null ||
      (typeof value === "object" && Object.keys(value).length === 0) ||
      (typeof value === "string" && value.trim().length === 0)
    ) {
      return true;
    }

    return false;
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    console.log(`New user ${JSON.stringify(newUser)}`);

    // submit the form
    axios
      .post("/api/users/register", newUser)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err.response.data);
        this.setState({ errors: err.response.data });
      });
  }

  checkError(val) {
    const err = !this.isEmpty(val) ? (
      <Label basic color="red" pointing="below" style={{ width: "100%" }}>
        {val}
      </Label>
    ) : null;

    return err;
  }

  render() {
    const nameError = this.checkError(this.state.errors.name);
    const emailError = this.checkError(this.state.errors.email);
    const passwordError = this.checkError(this.state.errors.password);
    const password2Error = this.checkError(this.state.errors.password2);

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

export default Register;
