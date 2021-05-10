import React, { useEffect, useState } from 'react';
import Zoom from 'react-reveal/Zoom';
import axios from 'axios';
import { Form, Image, Loader, Message } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { Button, Container, Row, Col } from 'reactstrap';
import CardsGroup from './CardsGroup';
import styles from './Register.module.css';
import Wilson from './gamepage/images/matthew.png';

export default function Register() {
  const [teams, setTeams] = useState([]);
  const [users, setUsers] = useState([]);
  const [pseudoUser, setPseudoUser] = useState('');
  const [TeamUuid, setTeamUuid] = useState('');
  // TeamUuid: null,
  const [wantCreateATeam, setWantCreateATeam] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [teamLogo, setTeamLogo] = useState('');
  const [randomPic, setRandomPic] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [canPlayGame, setCanPlayGame] = useState(false);
  const [error, setError] = useState(false);
  const [errorUrl, setErrorUrl] = useState(false);
  const [errorPseudoJoin, setErrorPseudoJoin] = useState(false);
  const [errorPseudoCreate, setErrorPseudoCreate] = useState(false);
  const [errorTeam, setErrorTeam] = useState(false);

  const getAllData = async () => {
    try {
      await axios.get('http://localhost:8000/teams').then((res) => {
        console.log('TEAM CALL DATA: ', res.data);
        setTeams(res.data);
      });
      await axios.get('http://localhost:8000/users').then((res) => {
        console.log('USERS CALL DATA: ', res.data);
        setUsers(res.data);
      });
    } catch (err) {
      console.log('ERROR HANDLE...', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  const getRandomPic = async () => {
    const randomNumber = Math.floor(Math.random() * 807);
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${randomNumber}`
    );
    setTeamLogo(res.data.sprites.front_default);
  };

  const submitJoinTeam = async (e) => {
    e.preventDefault(); // prevent page reload

    try {
      const { data } = await axios.get('http://localhost:8000/users');
      if (
        !data.find(
          (user) => user.pseudo.toLowerCase() === pseudoUser.toLowerCase()
        ) &&
        TeamUuid &&
        pseudoUser
      ) {
        const res = await axios.post('http://localhost:8000/users', {
          pseudo: pseudoUser,
          team: TeamUuid,
        });
        window.localStorage.setItem('uuid', res.data.uuid);
        setCanPlayGame(true);
      } else {
        setErrorPseudoJoin(true);
      }
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const submitCreateTeam = async (event) => {
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
        const resTeam = await axios.post('http://localhost:8000/teams', {
          name: teamName,
          logo: teamLogo,
        });

        const resUser = await axios.post('http://localhost:8000/users', {
          pseudo: pseudoUser,
          team: resTeam.data.uuid,
        });

        localStorage.setItem('uuid', resUser.data.uuid);

        setCanPlayGame(true);
      } else if (
        teams.find((team) => team.name.toLowerCase() === teamName.toLowerCase())
      ) {
        setErrorTeam(true);
      } else if (
        users.find(
          (user) => user.pseudo.toLowerCase() === pseudoUser.toLowerCase()
        )
      ) {
        setErrorPseudoCreate(true);
      }
      setIsLoading(false);
    } catch (err) {
      setError(err);
      setErrorUrl(true);
    }
  };

  const handlePseudoChange = (event) => {
    setPseudoUser(event.target.value);
  };

  const handleTeamNameChange = (event) => {
    setTeamName(event.target.value);
  };

  const handleTeamLogoChange = (event) => {
    setTeamLogo(event.target.value);
  };

  const handlePseudoUserChange = (event) => {
    setPseudoUser(event.target.value);
  };

  const chooseTeam = (id) => {
    setTeamUuid(id);
  };

  const toggleCreationTeamPanel = () => {
    setWantCreateATeam(!wantCreateATeam);
  };
  if (isLoading) {
    return (
      <Container style={{ paddingTop: '300px' }}>
        <Loader active inverted inline="centered" size="huge">
          Loading
        </Loader>
      </Container>
    );
  } else if (canPlayGame || window.localStorage.getItem('uuid')) {
    return <Redirect to="/game" />;
  } else {
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
                  onClick={() => toggleCreationTeamPanel()}
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
                  onClick={() => toggleCreationTeamPanel()}
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
            <Form size="large" onSubmit={submitJoinTeam}>
              <Row>
                <Col>
                  <Form.Field style={{ margin: '10px 0px' }}>
                    <Form.Input
                      required
                      placeholder="Pseudo"
                      value={pseudoUser}
                      name="pseudoUser"
                      onChange={(e) => handlePseudoChange(e)}
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

              <Zoom>
                <Row style={{ justifyContent: 'center' }}>
                  {teams
                    .filter((team) => team.logo.includes('PokeAPI'))
                    .map(({ uuid, logo, name, createdAt, Users }) => (
                      <Col style={{ marginTop: '20px' }}>
                        <CardsGroup
                          key={uuid}
                          image={logo}
                          header={name}
                          date={createdAt}
                          usersNumber={Users.length}
                          onClick={() => chooseTeam(uuid)}
                          TeamUuid={TeamUuid}
                          uuid={uuid}
                        />
                      </Col>
                    ))}
                </Row>
              </Zoom>
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
          )}

          {wantCreateATeam && (
            <>
              <Form size="large" onSubmit={submitCreateTeam}>
                <Row>
                  <Col>
                    <Form.Field style={{ margin: '10px 0px 5px 0px' }}>
                      <Form.Input
                        required
                        placeholder="Pseudo"
                        value={pseudoUser}
                        name="pseudoUser"
                        onChange={(e) => handlePseudoUserChange(e)}
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
                        onChange={(e) => handleTeamNameChange(e)}
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
                    <Form.Field
                      style={{ margin: '5px 0px 10px 0px', display: 'none' }}
                    >
                      <Form.Input
                        required
                        placeholder="https://image.png ou https://image.jpg"
                        value={teamLogo}
                        name="teamLogo"
                        onChange={(e) => handleTeamLogoChange(e)}
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
                      onClick={() => getRandomPic()}
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
