import React from 'react';
import Zoom from 'react-reveal/Zoom';
import Slider from 'infinite-react-carousel';
import axios from 'axios';
import {
  Header,
  Form,
  Image,
  Grid,
  Loader,
  Message,
  Dimmer,
  Segment,
} from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import CardsGroup from './CardsGroup';
import styles from './Register.module.css';
import Wilson from './gamepage/images/matthew.png';
import { Button, Container, Row, Col } from 'reactstrap';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      users: [],
      pseudoUser: '',
      teamUuid: null,
      wantCreateATeam: false,
      teamName: '',
      teamLogo: '',
      randomPic: '',
      isLoading: true,
      canPlayGame: false,
      error: false,
      errorUrl: false,
      errorPseudoJoin: false,
      errorPseudoCreate: false,
      errorTeam: false,
    };
    this.toggleCreationTeamPanel = this.toggleCreationTeamPanel.bind(this);
    this.chooseTeam = this.chooseTeam.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitJoinTeam = this.submitJoinTeam.bind(this);
    this.submitCreateTeam = this.submitCreateTeam.bind(this);
    this.getRandomPic = this.getRandomPic.bind(this);
  }

  async componentDidMount() {
    try {
      await axios
        .get('https://virusclicker.herokuapp.com/teams')
        .then((res) => {
          this.setState({ teams: res.data });
        });
      await axios
        .get('https://virusclicker.herokuapp.com/users')
        .then((res) => {
          this.setState({ users: res.data });
        });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  async getRandomPic() {
    const randomNumber = Math.floor(Math.random() * 807);
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${randomNumber}`
    );
    this.setState({ teamLogo: res.data.sprites.front_default });
  }

  async submitJoinTeam(e) {
    const { teamUuid, pseudoUser } = this.state;
    e.preventDefault(); // prevent page reload

    try {
      const { data } = await axios.get(
        'https://virusclicker.herokuapp.com/users'
      );
      if (
        !data.find(
          (user) => user.pseudo.toLowerCase() === pseudoUser.toLowerCase()
        ) &&
        teamUuid &&
        pseudoUser
      ) {
        const res = await axios.post(
          'https://virusclicker.herokuapp.com/users',
          {
            pseudo: pseudoUser,
            team: teamUuid,
          }
        );
        window.localStorage.setItem('uuid', res.data.uuid);
        this.setState({ canPlayGame: true });
      } else {
        this.setState({ errorPseudoJoin: true });
      }
    } catch (err) {
      this.setState({ error: err });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  async submitCreateTeam(event) {
    const { teams, teamName, teamLogo, pseudoUser, users } = this.state;
    event.preventDefault();

    try {
      if (
        !teams.find(
          (team) => team.name.toLowerCase() === teamName.toLowerCase()
        ) &&
        teamName &&
        teamLogo &&
        pseudoUser &&
        !users.find(
          (user) => user.pseudo.toLowerCase() === pseudoUser.toLowerCase()
        )
      ) {
        const resTeam = await axios.post(
          'https://virusclicker.herokuapp.com/teams',
          {
            name: teamName,
            logo: teamLogo,
          }
        );

        const resUser = await axios.post(
          'https://virusclicker.herokuapp.com/users',
          {
            pseudo: pseudoUser,
            team: resTeam.data.uuid,
          }
        );

        localStorage.setItem('uuid', resUser.data.uuid);

        this.setState({ canPlayGame: true });
      } else if (
        teams.find((team) => team.name.toLowerCase() === teamName.toLowerCase())
      ) {
        this.setState({ errorTeam: true });
      } else if (
        users.find(
          (user) => user.pseudo.toLowerCase() === pseudoUser.toLowerCase()
        )
      ) {
        this.setState({ errorPseudoCreate: true });
      }
    } catch (err) {
      this.setState({ error: err });
      this.setState({ errorUrl: true });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  chooseTeam(id) {
    this.setState({ teamUuid: id });
  }

  toggleCreationTeamPanel() {
    const { wantCreateATeam } = this.state;
    this.setState({ wantCreateATeam: !wantCreateATeam });
  }

  render() {
    const {
      canPlayGame,
      teams,
      pseudoUser,
      wantCreateATeam,
      teamName,
      teamLogo,
      isLoading,
      error,
      errorPseudoJoin,
      errorTeam,
      errorUrl,
      errorPseudoCreate,
      teamUuid,
      randomPic,
    } = this.state;
    if (isLoading) {
      return (
        <Container style={{ paddingTop: '300px' }}>
          <Loader active inverted inline="centered" size="huge">
            Loading
          </Loader>
        </Container>
      );
    }

    if (canPlayGame || window.localStorage.getItem('uuid')) {
      return <Redirect to="/game" />;
    }
    return (
      <div>
        <h1 className={styles.title}>Register</h1>
        <Container>
          <Row style={{ textAlign: 'center' }}>
            <Col style={{ textAlign: 'start' }}>
              {wantCreateATeam ? (
                <Button
                  style={{ margin: 0 }}
                  outline
                  color="danger"
                  size="lg"
                  onClick={this.toggleCreationTeamPanel}
                  className={styles.buttons}
                >
                  Join a team
                </Button>
              ) : (
                <Button
                  style={{ margin: 0 }}
                  color="danger"
                  size="lg"
                  className={styles.buttons}
                >
                  Join a team
                </Button>
              )}
            </Col>
            <Col style={{ textAlign: 'end' }}>
              {!wantCreateATeam ? (
                <Button
                  style={{ margin: 0 }}
                  outline
                  color="danger"
                  size="lg"
                  onClick={this.toggleCreationTeamPanel}
                  className={styles.buttons}
                >
                  Create a team
                </Button>
              ) : (
                <Button
                  style={{ margin: 0 }}
                  color="danger"
                  size="lg"
                  className={styles.buttons}
                >
                  Create a team
                </Button>
              )}
            </Col>
          </Row>

          {!wantCreateATeam && (
            <>
              <Form size="large" onSubmit={this.submitJoinTeam}>
                <Row>
                  <Col>
                    <Form.Field style={{ margin: '10px 0px' }}>
                      <Form.Input
                        required
                        placeholder="Pseudo"
                        value={pseudoUser}
                        name="pseudoUser"
                        onChange={this.handleChange}
                        error={
                          errorPseudoJoin && {
                            content: 'This pseudo is already taken',
                            pointing: 'below',
                          }
                        }
                      />
                    </Form.Field>
                  </Col>
                </Row>

                <Row style={{ justifyContent: 'center' }}>
                  <Zoom>
                    {teams
                      .filter((team) => team.logo.includes('PokeAPI'))
                      .map(({ uuid, logo, name, createdAt, users }) => {
                        return (
                          <Col style={{ marginTop: '20px' }}>
                            <CardsGroup
                              key={uuid}
                              image={logo}
                              header={name}
                              date={createdAt}
                              usersNumber={users.length}
                              onClick={() => this.chooseTeam(uuid)}
                              teamUuid={teamUuid}
                              uuid={uuid}
                            />
                          </Col>
                        );
                      })}
                  </Zoom>
                </Row>
                <Zoom left>
                  <Row>
                    <Col style={{ textAlign: 'center' }}>
                      {!wantCreateATeam && (
                        <Button
                          color="danger"
                          type="submit"
                          value=""
                          disabled={isLoading}
                          size="lg"
                          style={{ margin: '50px' }}
                          className={styles.buttons}
                        >
                          {!isLoading ? 'Start' : 'Loading...'}
                        </Button>
                      )}
                    </Col>
                  </Row>
                </Zoom>
              </Form>
            </>
          )}

          {wantCreateATeam && (
            <>
              <Form size="large" onSubmit={this.submitCreateTeam}>
                <Row>
                  <Col>
                    <Form.Field style={{ margin: '10px 0px 5px 0px' }}>
                      <Form.Input
                        required
                        placeholder="Pseudo"
                        value={pseudoUser}
                        name="pseudoUser"
                        onChange={this.handleChange}
                        error={
                          errorPseudoCreate && {
                            content: 'This pseudo is already taken',
                            pointing: 'below',
                          }
                        }
                      />
                    </Form.Field>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Field style={{ margin: '5px 0px' }}>
                      <Form.Input
                        required
                        placeholder="Team name"
                        value={teamName}
                        name="teamName"
                        onChange={this.handleChange}
                        error={
                          errorTeam && {
                            content: "This team's name is already taken",
                            pointing: 'below',
                          }
                        }
                      />
                    </Form.Field>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Field style={{ margin: '5px 0px 10px 0px', display: 'none' }}>
                      <Form.Input
                        required
                        placeholder="https://image.png ou https://image.jpg"
                        value={teamLogo}
                        name="teamLogo"
                        onChange={this.handleChange}
                        error={
                          errorUrl && {
                            content: 'This URL is not valid',
                            pointing: 'below',
                          }
                        }
                      />
                    </Form.Field>
                  </Col>
                </Row>

                <Row>
                  <Col style={{ textAlign: '-webkit-center' }}>
                    <Image
                      textAlign="center"
                      style={{
                        width: '180px',
                        height: '180px',
                        borderRadius: 10,
                        margin: '0',
                      }}
                      src={teamLogo || randomPic || Wilson}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col style={{ textAlign: 'center', marginTop: '10px' }}>
                    <Button
                      textAlign="center"
                      color="warning"
                      type="button"
                      onClick={this.getRandomPic}
                      disabled={isLoading}
                      size="lg"
                      className={styles.buttons}
                    >
                      Random picture
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col style={{ textAlign: 'center', marginTop: '30px' }}>
                    <Button
                      textAlign="center"
                      color="danger"
                      type="submit"
                      disabled={isLoading}
                      size="lg"
                      className={styles.buttons}
                    >
                      {!isLoading ? 'Start' : 'Loading...'}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </>
          )}
          {error ? (
            <Message warning>
              <Message.Header>Error</Message.Header>
              <p>
                Unexpected error has occurred. Please check if every fields are
                completed.
              </p>
            </Message>
          ) : (
            <></>
          )}
        </Container>
      </div>
    );
  }
}

export default Register;
