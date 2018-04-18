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

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      email: this.state.password,
      password: this.state.password
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
              <Image src={logo} /> Log-in to your account
            </Header>

            <Form size="large">
              <Segment stacked>
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

                <Button onClick={this.onSubmit} color="teal" fluid size="large">
                  Login
                </Button>

                <Divider horizontal>Or Log-in with</Divider>

                <Button
                  color="linkedin"
                  style={{ width: "100%", marginTop: "1em" }}
                >
                  <Icon name="linkedin" /> LinkedIn
                </Button>
              </Segment>
            </Form>

            <Message>
              New to us?{" "}
              <Link to="/register" style={{ color: "orange" }}>
                Register
              </Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Login;
