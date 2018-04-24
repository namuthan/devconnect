import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import { Spinner } from "../reuseable";
import NoProfile from "./NoProfile";
import ProfileActions from "./ProfileActions";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDelete() {
    this.props.deleteAccount();
  }
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner label={user.name} color="orange" />;
    } else {
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p>
              Welcome{" "}
              <Link to={`/profiles/${profile.handle}`}>{user.name}</Link>
            </p>
            <ProfileActions />
            <div style={{ marginBottom: "60px" }} />
            <button
              onClick={this.onDelete.bind(this)}
              className="btn btn-danger"
            >
              Delete My Account
            </button>
          </div>
        );
      } else {
        // User is Logged in but has no profile
        dashboardContent = (
          <NoProfile name={user.name} avatar={user.avatar} email={user.email} />
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{dashboardContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
