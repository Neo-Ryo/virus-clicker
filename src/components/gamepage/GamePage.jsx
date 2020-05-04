import React from 'react';
import { Grid } from 'semantic-ui-react';
import Planet from './Planet';
import VirusButton from './VirusButton';
import TitleInGame from './TitleInGame';
import UserInfos from './UserInfos';

class GamePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      total: 1000,
    };
    this.increment = this.increment.bind(this);
  }

  increment() {
    const { counter } = this.state;
    return this.setState({ counter: counter + 1 });
  }

  render() {
    const { counter, total } = this.state;
    return (
      <>
        <Grid>
          <Grid.Row columns={3}>
            <Grid.Column width={4}>
              <UserInfos />
            </Grid.Column>
            <Grid.Column width={8}>
              <TitleInGame counter={counter} />
            </Grid.Column>
            <Grid.Column width={4} />
          </Grid.Row>
          <Grid.Row centered columns={3}>
            <Grid.Column width={6}>
              <Planet percentage={(100 * counter) / total} />
            </Grid.Column>
          </Grid.Row>
          {/* <Grid.Row columns={1}>
            <Grid.Column width={16}>
              <TableScoreInGame />
            </Grid.Column>
          </Grid.Row> */}
          <Grid.Row centered columns={2}>
            <Grid.Column>
              <VirusButton counter={counter} increment={this.increment} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    );
  }
}

export default GamePage;
