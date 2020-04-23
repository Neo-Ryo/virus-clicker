import React, { Component } from "react";
import { Segment, Header } from "semantic-ui-react";
import TeamCards from "./TeamCards";

class TeamMaker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      futurestateincoming: "",
    };
  }
  render() {
    return (
      <>
        <Header as="h1" textAlign="center">
          Game Builder
        </Header>
        <Segment>
          <Header as="h3">Join a team</Header>
          <input value="" placeholder="pseudo" />
          <input value="" placeholder="team search" />
        </Segment>

        <TeamCards />
      </>
    );
  }
}

export default TeamMaker;
