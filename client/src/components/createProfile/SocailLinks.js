import React, { Component } from "react";
import { Grid, Header, Form, Segment } from "semantic-ui-react";

import createErrorLabel from "../../utils/createErrorLabel";

class SocailLinks extends Component {
  render() {
    const {
      twitter,
      facebook,
      linkedin,
      youtube,
      instagram,
      errors,
      onChange
    } = this.props;

    const twitterError = createErrorLabel(errors.twitter);
    const facebookError = createErrorLabel(errors.facebook);
    const linkedinError = createErrorLabel(errors.linkedin);
    const youtubeError = createErrorLabel(errors.youtube);
    const instagramError = createErrorLabel(errors.instagram);

    return (
      <div className="login-form">
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="orange" textAlign="center" />
            <Form size="large">
              <Segment stacked>
                {twitterError}
                <Form.Input
                  action={{
                    color: "teal",
                    icon: "twitter"
                  }}
                  actionPosition="left"
                  placeholder="Twitter profile url"
                  type="text"
                  value={twitter}
                  onChange={onChange}
                  name="twitter"
                />

                {facebookError}
                <Form.Input
                  action={{
                    color: "teal",
                    icon: "facebook"
                  }}
                  actionPosition="left"
                  placeholder="Facebook profile url"
                  type="text"
                  value={facebook}
                  onChange={onChange}
                  name="facebook"
                />

                {linkedinError}
                <Form.Input
                  action={{
                    color: "teal",
                    icon: "linkedin"
                  }}
                  actionPosition="left"
                  placeholder="Linkedin profile url"
                  value={linkedin}
                  onChange={onChange}
                  name="linkedin"
                />

                {youtubeError}
                <Form.Input
                  action={{
                    color: "teal",
                    icon: "youtube"
                  }}
                  actionPosition="left"
                  placeholder="Youtube profile url"
                  value={youtube}
                  onChange={onChange}
                  name="youtube"
                />

                {instagramError}
                <Form.Input
                  action={{
                    color: "teal",
                    icon: "instagram"
                  }}
                  actionPosition="left"
                  placeholder="Instagram profile url"
                  value={instagram}
                  onChange={onChange}
                  name="instagram"
                />
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default SocailLinks;
