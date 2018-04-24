import React, { Component } from "react";
import { Card, Icon, List, Header } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";

import isEmpty from "../../utils/is-empty";
import NavButton from "../reuseable/NavButton";

class Extra extends Component {
  render() {
    const { skills, status, company, location } = this.props;

    let topSkills = skills.slice(0, 3).map(skill => (
      <List.Item key={skill}>
        <List.Content>
          <Header color={"orange"} size={"tiny"}>
            {skill}
          </Header>
        </List.Content>
      </List.Item>
    ));

    console.log(this.props);
    return (
      <div>
        {isEmpty(status) ? null : <span>{status}</span>}
        {isEmpty(status) ? null : <br />}

        {isEmpty(company) ? null : <span>{company}</span>}
        {isEmpty(company) ? null : <br />}

        {isEmpty(location) ? null : <span>{location}</span>}
        <hr />
        <div
          style={{ width: "auto", padding: 0 }}
          className="col-md-4 d-none d-md-block"
        >
          <h4>Top Three Skills</h4>
          <List animated style={{ width: "auto" }}>
            {topSkills}
          </List>
        </div>
      </div>
    );
  }
}

const temp = props => <Extra {...props} />;

const ProfileItem = ({ profile, history }) => (
  <div className="col-sm-6 col-md-4 col-lg-3">
    <Card
      style={{ marginBottom: "20px" }}
      image={profile.user.avatar}
      header={profile.user.name}
      meta={profile.handle}
      description={profile.bio}
      color="teal"
      fluid
      link
      onClick={e => {
        history.push(`/${profile.handle}`);
      }}
      extra={temp(profile)}
    />
  </div>
);

export default withRouter(ProfileItem);
