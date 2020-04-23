import React, { Component } from "react";
import { Segment, Header } from "semantic-ui-react";
import TeamCards from "./TeamCards";

class TeamMaker extends Component {
  render() {
    return (
      <>
        <Header as="h1" textAlign="center">
          Game Builder
        </Header>
        <Segment>
          <Header as="h3">Join a team</Header>
          {/*input await*/}
        </Segment>

        <TeamCards />
      </>
    );
  }
}

export default TeamMaker;
