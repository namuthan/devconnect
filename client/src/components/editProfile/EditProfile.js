import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { Grid, Divider, Button } from "semantic-ui-react";

import BasicInfo from "../createProfile/BasicInfo";
import MoreInfo from "../createProfile/MoreInfo";
import SocailLinks from "../createProfile/SocailLinks";

import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import isEmpty from "../../utils/is-empty";
import Center from "../reuseable/Center";

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

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      const skills = profile.skills.map(skill => {
        return {
          id: skill,
          text: skill
        };
      });

      profile.company = !isEmpty(profile.company) ? profile.company : "";
      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.githubusername = !isEmpty(profile.githubusername)
        ? profile.githubusername
        : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : "";
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : "";
      profile.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : "";
      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : "";
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : "";

      console.log(profile);

      //set component state
      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        skills: skills,
        githubusername: profile.githubusername,
        bio: profile.bio,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedin: profile.linkedin,
        youtube: profile.youtube,
        instagram: profile.instagram
      });
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
    this.props.createProfile(profileData, this.props.history);
  }

  render() {
    let {
      displaySocialInputs,
      handle,
      status,
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
      <Center>
        <Grid style={{ height: "100%" }} verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Link to="/dashboard" className="btn btn-light">
              Go Back
            </Link>
            <Divider horizontal> Edit Profile</Divider>

            <BasicInfo
              handle={handle}
              company={company}
              website={website}
              errors={errors}
              onChange={this.onChange}
              status={status}
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
              style={{ marginTop: "20px", width: "200px" }}
              onClick={this.toggleSocailLinks}
              textColor="orange"
              fluid
              size="mini"
            >
              Edit Social Network Links
            </Button>
            {socialInputs}
            <Divider horizontal />
            <Button onClick={this.onSave} color="orange" fluid size="large">
              Save
            </Button>
          </Grid.Column>
        </Grid>
      </Center>
    );
  }
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(CreateProfile)
);
