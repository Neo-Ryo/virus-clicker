/* eslint-disable no-console */
import React from 'react';
import Zoom from 'react-reveal/Zoom';
import { Loader } from 'semantic-ui-react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import Planet from './Planet';
import VirusButton from './VirusButton';
import TitleInGame from './TitleInGame';
import UserInfos from './UserInfos';
import TableScoreInGame from './TableScoreInGame';
import {
  Row,
  Col,
  Container,
  PopoverBody,
  UncontrolledPopover,
  Button,
  Badge,
} from 'reactstrap';

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

  increment(event) {
    event.preventDefault();
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
          <Loader inverted active inline="centered" size="huge">
            Loading
          </Loader>
        </Container>
      );
    }
    if (!window.localStorage.getItem('uuid')) {
      return <Redirect to="/" />;
    }

    return (
      <Zoom left>
        <Container fluid>
          <Row
            style={{ background: '#000066', color: 'white', height: '70px' }}
          >
            <Col
              style={{ textAlign: 'center', alignSelf: 'center' }}
              xs={{ size: '3', offset: 0 }}
              sm={{ size: '3', offset: 0 }}
              md={{ size: '3', offset: 0 }}
              lg={{ size: '3', offset: 0 }}
            >
              <UserInfos />
            </Col>
            <Col
              style={{ textAlign: 'center', alignSelf: 'center' }}
              xs={{ size: '6', offset: 0 }}
              sm={{ size: '6', offset: 0 }}
              md={{ size: '6', offset: 0 }}
              lg={{ size: '6', offset: 0 }}
            >
              <TitleInGame counter={counter} />
            </Col>
            <Col
              style={{ textAlign: 'center', alignSelf: 'center' }}
              xs={{ size: '3', offset: 0 }}
              sm={{ size: '3', offset: 0 }}
              md={{ size: '3', offset: 0 }}
              lg={{ size: '3', offset: 0 }}
            >
              <Button id="Skins" type="button" color="danger">
                Skins
              </Button>

              <UncontrolledPopover
                trigger="legacy"
                placement="bottom"
                target="Skins"
              >
                <PopoverBody>
                  <Button onClick={this.changeToSkin1}>Skin 1</Button>
                </PopoverBody>
                <PopoverBody>
                  {counter > 20 ? (
                    <Button onClick={this.changeToSkin2}>Skin 2</Button>
                  ) : (
                    <Button disabled onClick={this.changeToSkin2}>
                      Skin 2
                    </Button>
                  )}
                </PopoverBody>
                <PopoverBody>
                  {counter > 40 ? (
                    <Button onClick={this.changeToSkin3}>Skin 3</Button>
                  ) : (
                    <Button disabled onClick={this.changeToSkin3}>
                      Skin 3
                    </Button>
                  )}
                </PopoverBody>
                <PopoverBody>
                  {counter > 60 ? (
                    <Button onClick={this.changeToSkinWtf}>Skin ?</Button>
                  ) : (
                    <Button disabled onClick={this.changeToSkinWtf}>
                      Skin ?
                    </Button>
                  )}{' '}
                </PopoverBody>
              </UncontrolledPopover>
            </Col>
          </Row>

          <Row>
            <Col
              style={{ textAlign: 'center', padding: 0 }}
              xs={{ size: '8', offset: 0 }}
              sm={{ size: '8', offset: 0 }}
              md={{ size: '3', offset: 0 }}
              lg={{ size: '3', offset: 0 }}
            >
              <TableScoreInGame teamsData={teamsData} counter={counter} />
            </Col>
            <Col
              style={{ textAlign: 'center', alignSelf: 'center' }}
              xs={{ size: '4', offset: 0 }}
              sm={{ size: '4', offset: 0 }}
              md={{ size: '4', offset: 0 }}
              lg={{ size: '4', offset: 0 }}
            >
              {teamLoader ? (
                'loading'
              ) : (
                <Planet percentage={(100 * teamScore) / total} />
              )}
            </Col>
          </Row>

          <Row style={{ backgroundColor: 'rgb(0, 0, 102)' }}>
            
            <Col
              style={{ textAlign: 'center', alignSelf: 'center' }}
              xs={{ size: '6'}}
              sm={{ size: '6'}}
              md={{ size: '6'}}
              lg={{ size: '6'}}
            >
               <Badge color="warning" pill>My score : {counter}</Badge>
            </Col>

            <Col
              style={{ textAlign: 'center', alignSelf: 'center' }}
              xs={{ size: '3' }}
              sm={{ size: '3' }}
              md={{ size: '3' }}
              lg={{ size: '3' }}
            >
              <Link to="/tableScore">
                <Button onClick={() => ''} color="warning">
                  Scores
                </Button>
              </Link>
            </Col>
            
          </Row>

          <Row>
            <Col
              style={{ textAlign: 'center' }}
              xs={{ size: '12', offset: 0 }}
              sm={{ size: '12', offset: 0 }}
              md={{ size: '4', offset: 4 }}
              lg={{ size: '4', offset: 4 }}
            >
              <VirusButton
                counter={counter}
                increment={this.increment}
                rhume={rhume}
                lepre={lepre}
                sida={sida}
                covid19={covid19}
              />
            </Col>
          </Row>
        </Container>
      </Zoom>
    );
  }
}

export default GamePage;
