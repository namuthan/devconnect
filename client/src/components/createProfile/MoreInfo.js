import React, { Component } from "react";
import { WithContext as ReactTags } from "react-tag-input";
import { Form, Segment, Grid } from "semantic-ui-react";

import "./style.css";
import createErrorLabel from "../../utils/createErrorLabel";

class MoreInfo extends Component {
  constructor(props) {
    super(props);
    this.onSkillClick = this.onSkillClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSkillClick(index) {}

  onChange(e) {}

  render() {
    const {
      githubusername,
      location,
      bio,
      skills,
      errors,
      onChange,
      suggestions,
      onDeleteSkill,
      onAddSkill,
      onDragSkill
    } = this.props;
    const skillsError = createErrorLabel(errors.skills);

    return (
      <Grid
        textAlign="center"
        style={{ height: "100%" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Form>
            <Segment stacked>
              <Form.Field>
                <label style={{ textAlign: "left" }}>Github username</label>
                <Form.Input
                  fluid
                  placeholder="Github user name"
                  name="githubusername"
                  type="text"
                  value={githubusername}
                  onChange={onChange}
                />
              </Form.Field>
              <Form.Field>
                <label style={{ textAlign: "left" }}>Location</label>
                <Form.Input
                  fluid
                  placeholder="Location"
                  name="location"
                  type="text"
                  value={location}
                  onChange={onChange}
                />
              </Form.Field>
              <Form.Field>
                <label style={{ textAlign: "left" }}>Bio</label>
                <Form.TextArea
                  placeholder="Short Bio"
                  name="bio"
                  type="text"
                  value={bio}
                  onChange={onChange}
                />
              </Form.Field>

              <Form.Field required>
                {skillsError}
                <label style={{ textAlign: "left" }}>Skills</label>
                <ReactTags
                  inline={false}
                  autofocus={false}
                  tags={skills}
                  suggestions={suggestions}
                  handleDelete={onDeleteSkill}
                  handleAddition={onAddSkill}
                  handleDrag={onDragSkill}
                  handleTagClick={this.onSkillClick}
                  allowDeleteFromEmptyInput={true}
                  placeholder={"Add new skill"}
                  handleInputChange={this.onChange}
                />
              </Form.Field>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default MoreInfo;
