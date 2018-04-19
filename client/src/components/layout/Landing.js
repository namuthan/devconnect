import React, { Component } from "react";
import { NavButton } from "../reuseable";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center getting-started">
                <h1 className="display-3 mb-4">Developer Hub</h1>
                <p className="lead">
                  {" "}
                  Create a developer profile/portfolio, share posts and get help
                  from your fellow developers Create a developer
                  profile/portfolio, share posts and get help from your fellow
                  developers Create a developer profile/portfolio, share posts
                  and get help from your fellow developers Create a developer
                  profile/portfolio, share posts and get help from your fellow
                  developers
                </p>
                <hr />

                <NavButton
                  path="/getting-started"
                  name="Getting Started"
                  color={"orange"}
                  size="massive"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
