import React, { Component } from "react";

export default class DHStep extends Component {
  render() {
    const { steps, onClick, size } = this.props;

    const stepsUI = steps.map(step => {
      return (
        <Step active onClick={onClick} link id={step.id} key={step.id}>
          <Icon name={step.iconName} />
          <Step.Content>
            <Step.Title>{step.title}</Step.Title>
            <Step.Description>{step.detail}</Step.Description>
          </Step.Content>
        </Step>
      );
    });

    return <Step.Group size={size}>{stepsUI}</Step.Group>;
  }
}
