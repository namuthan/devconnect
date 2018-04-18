import React, { Component } from "react";
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
  Divider
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
  }

  onChange(e) {
    console.log(`Calling onChange ${e.target.value}`);
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.password,
      password: this.state.password,
      password2: this.state.password2
    };

    console.log(`${JSON.stringify(newUser)}`);
  }

  render() {
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
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Name"
                  value={this.state.name}
                  onChange={this.onChange}
                  name="name"
                />
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail address"
                  value={this.state.email}
                  onChange={this.onChange}
                  name="email"
                />
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
