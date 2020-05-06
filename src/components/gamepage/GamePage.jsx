import React from 'react';
import { Grid } from 'semantic-ui-react';
import axios from 'axios';
import Planet from './Planet';
import VirusButton from './VirusButton';
import TitleInGame from './TitleInGame';
import UserInfos from './UserInfos';
import TableScoreInGame from './TableScoreInGame';

class GamePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      total: 1000,
      teamsData: [],
      isLoading: true,
    };

    this.increment = this.increment.bind(this);
    this.getOk = this.getOk.bind(this);
  }

  componentDidMount() {
    this.getOk();
  }

  componentDidUpdate(_prevProps, prevState) {
    const { counter } = this.state;
    if (prevState.counter !== counter) {
      this.getOk();
    }
  }

  getOk() {
    const uuid = '06b14f4a-8e7e-44a3-aba8-ab84ae799bd0'; // window.localStorage.getItem('uuid'); placeholder
    axios
      .get(`https://virusclicker.herokuapp.com/users/${uuid}`)
      .then((res) => res.data)
      .then((data) => {
        this.setState({ counter: data.score });
        return axios
          .get(`https://virusclicker.herokuapp.com/teams`)
          .then((res) => {
            this.setState({ teamsData: res.data });
          });
      })
      .then(() => {
        // const { teamsData } = this.state;
        // const teamsWithScore = teamsData.map((team) => {
        //   return {
        //     ...team,
        //     score: team.users
        //       .map((user) => user.score)
        //       .reduce((somme, score) => somme + score, 0),
        //   };
        // });

        this.setState((prevState) => ({
          ...prevState,
          teamsData: prevState.teamsData.map((team) => {
            return {
              ...team,
              score: team.users
                .map((user) => user.score)
                .reduce((somme, score) => somme + score, 0),
            };
          }),
        }));
      })
      .then(() => this.setState({ isLoading: false }));
  }

  increment() {
    const uuid = '06b14f4a-8e7e-44a3-aba8-ab84ae799bd0'; // window.localStorage.getItem('uuid'); placeholder
    const { counter } = this.state;
    axios.put(`https://virusclicker.herokuapp.com/users/${uuid}/click`);
    this.setState({ counter: counter + 1 });
  }

  render() {
    const { counter, total, teamsData, isLoading } = this.state;
    if (isLoading) {
      return <p>loading... </p>;
    }
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
          <Grid.Row columns={1}>
            <Grid.Column width={16}>
              <TableScoreInGame teamsData={teamsData} />
            </Grid.Column>
          </Grid.Row>
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
