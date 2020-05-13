/* eslint-disable no-console */
import React from 'react';
import Zoom from 'react-reveal/Zoom';
import { Grid, Loader, Container } from 'semantic-ui-react';
import axios from 'axios';
import Planet from './Planet';
import VirusButton from './VirusButton';
import TitleInGame from './TitleInGame';
import UserInfos from './UserInfos';
import TableScoreInGame from './TableScoreInGame';
import styles from './styles/GamePage.module.css';

class GamePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      total: 10000000,
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
    const uuid = window.localStorage.getItem('uuid');
    axios
      .get(`https://virusclicker.herokuapp.com/users/${uuid}`)
      .then((res) => {
        this.setState({ counter: res.data.score });
      });
    return axios
      .get(`https://virusclicker.herokuapp.com/teams`)
      .then((res) => {
        this.setState({ teamsData: res.data });
      })
      .then(() => {
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
    const uuid = window.localStorage.getItem('uuid');
    const { counter } = this.state;
    axios.put(`https://virusclicker.herokuapp.com/users/${uuid}/click`);
    this.setState({ counter: counter + 1 });
  }

  render() {
    const { counter, total, teamsData, isLoading } = this.state;
    if (isLoading) {
      return (
        <Container style={{ paddingTop: '300px' }}>
          <Loader active inline="centered" size="huge">
            Loading
          </Loader>
        </Container>
      );
    }
    return (
      <div className={styles.main}>
        <Zoom left>
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
              <Grid.Column width={10}>
                <TableScoreInGame teamsData={teamsData} counter={counter} />
              </Grid.Column>
              <Grid.Column width={6}>
                <Planet percentage={(100 * counter) / total} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row centered columns={2}>
              <Grid.Column width={11}>
                <VirusButton counter={counter} increment={this.increment} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Zoom>
      </div>
    );
  }
}

export default GamePage;
