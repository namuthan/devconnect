import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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
import createErrorLabel from "../../../utils/createErrorLabel";
import { loginUser } from "../../../actions/authActions";

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

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

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

    this.props.loginUser({
      email: this.state.email,
      password: this.state.password
    });
  }

  render() {
    const emailError = createErrorLabel(this.state.errors.email);
    const passwordError = createErrorLabel(this.state.errors.password);

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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
