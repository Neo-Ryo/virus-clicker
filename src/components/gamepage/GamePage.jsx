/* eslint-disable no-console */
import React from 'react';
import Zoom from 'react-reveal/Zoom';
import { Grid, Loader, Container, Button, Dropdown } from 'semantic-ui-react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
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
      total: 500,
      teamsData: [],
      userTeamUuid: '',
      teamScore: '',
      isLoading: true,
      teamLoader: true,
      rhume: true,
      lepre: false,
      sida: false,
      covid19: false,
    };

    this.increment = this.increment.bind(this);
    this.getOk = this.getOk.bind(this);
    this.changeToSkin1 = this.changeToSkin1.bind(this);
    this.changeToSkin2 = this.changeToSkin2.bind(this);
    this.changeToSkin3 = this.changeToSkin3.bind(this);
    this.changeToSkinWtf = this.changeToSkinWtf.bind(this);
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

  async getOk() {
    try {
      const uuid = window.localStorage.getItem('uuid');
      const resUuidUser = await axios.get(
        `https://virusclicker.herokuapp.com/users/${uuid}`
      );
      const resTeam = await axios.get(
        `https://virusclicker.herokuapp.com/teams`
      );

      const teamsWithScores = resTeam.data.map((team) => {
        return {
          ...team,
          score: team.users
            .map((user) => user.score)
            .reduce((somme, score) => somme + score, 0),
        };
      });
      this.setState((prevState) => ({
        ...prevState,
        counter: resUuidUser.data.score,
        userTeamUuid: resUuidUser.data.TeamUuid,
        teamsData: teamsWithScores,
        teamScore: teamsWithScores.find(
          (team) => team.uuid === resUuidUser.data.TeamUuid
        ).score,
        teamLoader: false,
      }));
    } catch (err) {
      this.setState({ error: err });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  increment() {
    const uuid = window.localStorage.getItem('uuid');
    const { counter } = this.state;
    axios.put(`https://virusclicker.herokuapp.com/users/${uuid}/click`);
    this.setState({ counter: counter + 1 });
  }

  changeToSkin1() {
    this.setState({
      rhume: true,
      lepre: false,
      sida: false,
      covid19: false,
    });
  }

  changeToSkin2() {
    this.setState({
      rhume: false,
      lepre: true,
      sida: false,
      covid19: false,
    });
  }

  changeToSkin3() {
    this.setState({
      rhume: false,
      lepre: false,
      sida: true,
      covid19: false,
    });
  }

  changeToSkinWtf() {
    this.setState({
      rhume: false,
      lepre: false,
      sida: false,
      covid19: true,
    });
  }

  render() {
    const {
      counter,
      total,
      teamsData,
      isLoading,
      rhume,
      lepre,
      sida,
      covid19,
      teamScore,
      teamLoader,
    } = this.state;
    if (isLoading) {
      return (
        <Container style={{ paddingTop: '300px' }}>
          <Loader active inline="centered" size="huge">
            Loading
          </Loader>
        </Container>
      );
    }
    if (!window.localStorage.getItem('uuid')) {
      return <Redirect to="/" />;
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
              <Grid.Column width={4}>
                <Dropdown
                  text="Skins"
                  floating
                  button
                  className="icon"
                  direction="left"
                  style={{
                    marginTop: '20px',
                    backgroundColor: '#00b5ad',
                    color: 'white',
                  }}
                >
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <Button
                        size="mini"
                        color="teal"
                        onClick={this.changeToSkin1}
                      >
                        Skin 1
                      </Button>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      {counter > 20 ? (
                        <Button
                          size="mini"
                          color="teal"
                          onClick={this.changeToSkin2}
                        >
                          Skin 2
                        </Button>
                      ) : (
                        <Button
                          size="mini"
                          color="teal"
                          disabled
                          onClick={this.changeToSkin2}
                        >
                          Skin 2
                        </Button>
                      )}
                    </Dropdown.Item>
                    <Dropdown.Item>
                      {counter > 40 ? (
                        <Button
                          size="mini"
                          color="teal"
                          onClick={this.changeToSkin3}
                        >
                          Skin 3
                        </Button>
                      ) : (
                        <Button
                          size="mini"
                          color="teal"
                          disabled
                          onClick={this.changeToSkin3}
                        >
                          Skin 3
                        </Button>
                      )}
                    </Dropdown.Item>
                    <Dropdown.Item>
                      {counter > 60 ? (
                        <Button
                          size="mini"
                          color="teal"
                          onClick={this.changeToSkinWtf}
                        >
                          Skin ?
                        </Button>
                      ) : (
                        <Button
                          size="mini"
                          color="teal"
                          disabled
                          onClick={this.changeToSkinWtf}
                        >
                          Skin ?
                        </Button>
                      )}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Grid.Column>
              <Grid.Column width={4} />
            </Grid.Row>
            <Grid.Row centered columns={3}>
              <Grid.Column width={10}>
                <TableScoreInGame teamsData={teamsData} counter={counter} />
              </Grid.Column>
              <Grid.Column width={6}>
                {teamLoader ? (
                  'loading'
                ) : (
                  <Planet percentage={(100 * teamScore) / total} />
                )}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row centered columns={2}>
              <Grid.Column width={11}>
                <VirusButton
                  counter={counter}
                  increment={this.increment}
                  rhume={rhume}
                  lepre={lepre}
                  sida={sida}
                  covid19={covid19}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Zoom>
      </div>
    );
  }
}

export default GamePage;
