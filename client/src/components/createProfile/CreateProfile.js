import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Grid, Divider, Button } from "semantic-ui-react";

import BasicInfo from "./BasicInfo";
import MoreInfo from "./MoreInfo";
import SocailLinks from "./SocailLinks";

import { createProfile } from "../../actions/profileActions";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.onSave = this.onSave.bind(this);
    this.state = {
      displaySocialInputs: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: [],
      githubusername: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onDeleteSkill = this.onDeleteSkill.bind(this);
    this.onAddSkill = this.onAddSkill.bind(this);
    this.onDragSkill = this.onDragSkill.bind(this);
    this.toggleSocailLinks = this.toggleSocailLinks.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  toggleSocailLinks() {
    this.setState({
      displaySocialInputs: !this.state.displaySocialInputs
    });
  }

  onChange(e, data) {
    this.setState({
      [data.name]: data.value
    });
  }

  onDeleteSkill(i) {
    const { skills } = this.state;
    this.setState({
      skills: skills.filter((skill, index) => index !== i)
    });
  }

  onAddSkill(skill) {
    const { skills } = this.state;
    this.setState({ skills: [...skills, ...[skill]] });
  }

  onDragSkill(skill, currPos, newPos) {
    const skills = [...this.state.skills];
    const newSkills = skills.slice();
    newSkills.splice(currPos, 1);
    newSkills.splice(newPos, 0, skill);
    this.setState({ skills: newSkills });
  }

  onSave(e) {
    e.preventDefault();
    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills.map(skill => skill.text).join(","),
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };

    console.log(JSON.stringify(profileData));

    this.props.createProfile(profileData, this.props.history);
  }

  render() {
    let {
      displaySocialInputs,
      handle,
      company,
      website,
      githubusername,
      location,
      bio,
      skills,
      twitter,
      facebook,
      linkedin,
      youtube,
      instagram,
      errors
    } = this.state;

    const socialInputs = displaySocialInputs ? (
      <SocailLinks
        twitter={twitter}
        facebook={facebook}
        linkedin={linkedin}
        youtube={youtube}
        instagram={instagram}
        onChange={this.onChange}
        errors={errors}
      />
    ) : (
      ""
    );

    return (
      <Grid
        textAlign="center"
        style={{ height: "100%" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Divider horizontal> Create Your Profile</Divider>

          <BasicInfo
            handle={handle}
            company={company}
            website={website}
            errors={errors}
            onChange={this.onChange}
          />
          <MoreInfo
            githubusername={githubusername}
            location={location}
            bio={bio}
            skills={skills}
            suggestions={[]}
            errors={errors}
            onChange={this.onChange}
            onDeleteSkill={this.onDeleteSkill}
            onAddSkill={this.onAddSkill}
            onDragSkill={this.onDragSkill}
          />
          <Button
            style={{ marginTop: "20px" }}
            onClick={this.toggleSocailLinks}
            color="orange"
            fluid
            size="small"
          >
            Add Social Network Links
          </Button>
          {socialInputs}
          <Divider horizontal />
          <Button onClick={this.onSave} color="teal" fluid size="large">
            Save
          </Button>
        </Grid.Column>
      </Grid>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile })(
  withRouter(CreateProfile)
);
