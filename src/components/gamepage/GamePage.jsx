/* eslint-disable no-console */
import React from 'react';
import Zoom from 'react-reveal/Zoom';
import { Grid, Loader, Container, Button, Dropdown } from 'semantic-ui-react';
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
      total: 500,
      teamsData: [],
      isLoading: true,
      skinOne: true,
      skinTwo: false,
      skinThree: false,
      skinWtf: false,
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

  changeToSkin1() {
    this.setState({
      skinOne: true,
      skinTwo: false,
      skinThree: false,
      skinWtf: false,
    });
  }

  changeToSkin2() {
    this.setState({
      skinOne: false,
      skinTwo: true,
      skinThree: false,
      skinWtf: false,
    });
  }

  changeToSkin3() {
    this.setState({
      skinOne: false,
      skinTwo: false,
      skinThree: true,
      skinWtf: false,
    });
  }

  changeToSkinWtf() {
    this.setState({
      skinOne: false,
      skinTwo: false,
      skinThree: false,
      skinWtf: true,
    });
  }

  render() {
    const {
      counter,
      total,
      teamsData,
      isLoading,
      skinOne,
      skinTwo,
      skinThree,
      skinWtf,
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
                <Planet percentage={(100 * counter) / total} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row centered columns={2}>
              <Grid.Column width={11}>
                <VirusButton
                  counter={counter}
                  increment={this.increment}
                  skinOne={skinOne}
                  skinTwo={skinTwo}
                  skinThree={skinThree}
                  skinWtf={skinWtf}
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
