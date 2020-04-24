import React from "react";
import Planet from "./Planet";
import VirusButton from "./VirusButton";
import TitleInGame from "./TitleInGame";
import UserInfos from "./UserInfos";
import { Grid } from "semantic-ui-react";

class GamePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    };
    this.increment = this.increment.bind(this);
  }
  increment() {
    this.setState({ counter: this.state.counter + 1 });
  }

  render() {
    return (
      <>
        <Grid>
          <Grid.Row columns={3}>
            <Grid.Column width={4}>
              <UserInfos />
            </Grid.Column>
            <Grid.Column width={8}>
              <TitleInGame counter={this.state.counter} />
            </Grid.Column>
            <Grid.Column width={4}></Grid.Column>
          </Grid.Row>
          <Grid.Row centered columns={3}>
            <Grid.Column width={6}>
              <Planet />
            </Grid.Column>
          </Grid.Row>
          {/* <Grid.Row columns={1}>
            <Grid.Column width={16}>
              <TableScoreInGame />
            </Grid.Column>
          </Grid.Row> */}
          <Grid.Row centered columns={2}>
            <Grid.Column>
              <VirusButton
                counter={this.state.counter}
                increment={this.increment}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    );
  }
}

export default GamePage;
