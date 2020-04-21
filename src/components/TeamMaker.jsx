import React, { Component } from "react";
import { Segment, Header, Card } from "semantic-ui-react";
const teams = [
  {
    teamlogo: "https://react.semantic-ui.com/images/avatar/small/lena.png",
    teamname: "Pikapika",
    members: 23,
  },
  {
    teamlogo: "https://react.semantic-ui.com/images/avatar/small/lena.png",
    teamname: "Pikapika",
    members: 23,
  },
  {
    teamlogo: "https://react.semantic-ui.com/images/avatar/small/lena.png",
    teamname: "Pikapika",
    members: 23,
  },
  {
    teamlogo: "https://react.semantic-ui.com/images/avatar/small/lena.png",
    teamname: "Pikapika",
    members: 23,
  },
  {
    teamlogo: "https://react.semantic-ui.com/images/avatar/small/lena.png",
    teamname: "Pikapika",
    members: 23,
  },
  {
    teamlogo: "https://react.semantic-ui.com/images/avatar/small/lena.png",
    teamname: "Pikapika",
    members: 23,
  },
  {
    teamlogo: "https://react.semantic-ui.com/images/avatar/small/lena.png",
    teamname: "Pikapika",
    members: 23,
  },
  {
    teamlogo: "https://react.semantic-ui.com/images/avatar/small/lena.png",
    teamname: "Pikapika",
    members: 23,
  },
  {
    teamlogo: "https://react.semantic-ui.com/images/avatar/small/lena.png",
    teamname: "Pikapika",
    members: 23,
  },
  {
    teamlogo: "https://react.semantic-ui.com/images/avatar/small/lena.png",
    teamname: "Pikapika",
    members: 23,
  },
  {
    teamlogo: "https://react.semantic-ui.com/images/avatar/small/lena.png",
    teamname: "Pikapika",
    members: 23,
  },
  {
    teamlogo: "https://react.semantic-ui.com/images/avatar/small/lena.png",
    teamname: "Pikapika",
    members: 23,
  },
  {
    teamlogo: "https://react.semantic-ui.com/images/avatar/small/lena.png",
    teamname: "Pikapika",
    members: 23,
  },
];

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
        <Segment>
          <Card.Group itemsPerRow={3}>
            {teams.map((team, i) => (
              <Card
                image={team.teamlogo}
                header={team.teamname}
                extra={team.members}
                size="mini"
              />
            ))}
          </Card.Group>
        </Segment>
      </>
    );
  }
}

export default TeamMaker;
