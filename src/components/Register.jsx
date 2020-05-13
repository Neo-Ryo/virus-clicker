import React from 'react';
import { CarouselProvider, Slider } from 'pure-react-carousel';
import axios from 'axios';
import {
  Card,
  Header,
  Form,
  Button,
  Image,
  Grid,
  Loader,
  Container,
} from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import TeamCards from './TeamCards';
import styles from './Register.module.css';

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
      isLoading: true,
      canPlayGame: false,
      error: false,
      errorPseudo: false,
    };
    this.toggleCreationTeamPanel = this.toggleCreationTeamPanel.bind(this);
    this.chooseTeam = this.chooseTeam.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitJoinTeam = this.submitJoinTeam.bind(this);
    this.submitCreateTeam = this.submitCreateTeam.bind(this);
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

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
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
      } else {
        // eslint-disable-next-line no-console
        this.setState({ errorPseudo: true });
      }
    } catch (err) {
      this.setState({ error: err });
    } finally {
      this.setState({ isLoading: false });
    }
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
        this.setState({ errorPseudo: true });
      }
    } catch (err) {
      this.setState({ error: err });
    } finally {
      this.setState({ isLoading: false });
    }
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
      errorPseudo,
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
    if (error) {
      return <p>There has been an error, please reload !</p>;
    }
    if (canPlayGame) {
      return <Redirect to="/game" />;
    }
    return (
      <div className={styles.backgrd}>
        <Header as="h1" className={styles.title}>
          Game Builder
        </Header>
        <Grid divided="vertically">
          <Grid.Row textAlign="center" columns={2}>
            <Grid.Column width={8}>
              {wantCreateATeam ? (
                <Button
                  style={{ margin: 0 }}
                  basic
                  color="purple"
                  size="large"
                  onClick={this.toggleCreationTeamPanel}
                >
                  Join a team
                </Button>
              ) : (
                <Button style={{ margin: 0 }} color="purple" size="large">
                  Join a team
                </Button>
              )}
            </Grid.Column>
            <Grid.Column width={8}>
              {!wantCreateATeam ? (
                <Button
                  style={{ margin: 0 }}
                  basic
                  color="purple"
                  size="large"
                  onClick={this.toggleCreationTeamPanel}
                >
                  Create a team
                </Button>
              ) : (
                <Button style={{ margin: 0 }} color="purple" size="large">
                  Create a team
                </Button>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>

        {!wantCreateATeam && (
          <>
            <Form size="large" onSubmit={this.submitJoinTeam}>
              <Form.Field style={{ margin: '10px' }}>
                <Form.Input
                  required
                  placeholder="Pseudo"
                  value={pseudoUser}
                  name="pseudoUser"
                  onChange={this.handleChange}
                  error={
                    errorPseudo && {
                      content: 'This pseudo is already taken',
                      pointing: 'below',
                    }
                  }
                />
              </Form.Field>
              <CarouselProvider
                naturalSlideWidth={100}
                naturalSlideHeight={100}
                totalSlides={teams.length}
              >
                <Slider>
                  <Card.Group size="tiny">
                    {teams
                      .filter((team) => team.logo && team.logo.length > 40)
                      .map(({ uuid, logo, name, createdAt, users }) => {
                        return (
                          <TeamCards
                            key={uuid}
                            image={logo}
                            header={name}
                            date={createdAt}
                            usersNumber={users.length}
                            onClick={() => this.chooseTeam(uuid)}
                          />
                        );
                      })}
                  </Card.Group>
                </Slider>
              </CarouselProvider>
              <Grid>
                <Grid.Row textAlign="center" columns={1}>
                  <Grid.Column width={16}>
                    {!wantCreateATeam && (
                      <Button
                        color="teal"
                        type="submit"
                        value=""
                        disabled={isLoading}
                        size="large"
                      >
                        {!isLoading ? 'Start' : 'Loading...'}
                      </Button>
                    )}
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
          </>
        )}

        {wantCreateATeam && (
          <>
            <Form size="large" onSubmit={this.submitCreateTeam}>
              <Form.Field style={{ margin: '10px' }}>
                <Form.Input
                  required
                  placeholder="Pseudo"
                  value={pseudoUser}
                  name="pseudoUser"
                  onChange={this.handleChange}
                  error={
                    errorPseudo && {
                      content: 'This pseudo is already taken',
                      pointing: 'below',
                    }
                  }
                />
              </Form.Field>
              <Form.Field style={{ margin: '10px' }}>
                <Form.Input
                  required
                  placeholder="Team name"
                  value={teamName}
                  name="teamName"
                  onChange={this.handleChange}
                  error={
                    errorPseudo && {
                      content: "This team's name is already taken",
                      pointing: 'below',
                    }
                  }
                />
              </Form.Field>
              <Form.Field style={{ margin: '10px' }}>
                <Form.Input
                  required
                  placeholder="https://image.png ou https://image.jpg"
                  value={teamLogo}
                  name="teamLogo"
                  onChange={this.handleChange}
                  error={
                    errorPseudo && {
                      content: 'This URL is not valid',
                      pointing: 'below',
                    }
                  }
                />
              </Form.Field>

              <Grid column={2} centered>
                <Grid.Row textAlign="center">
                  <Grid.Column width={8}>
                    <Image
                      textAlign="center"
                      style={{
                        width: '180px',
                        height: '180px',
                        borderRadius: 10,
                        margin: '0',
                      }}
                      src={teamLogo}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid>
                <Grid.Row textAlign="center" columns={1}>
                  <Grid.Column width={16}>
                    <Button
                      textAlign="center"
                      color="teal"
                      type="submit"
                      disabled={isLoading}
                      size="large"
                    >
                      {!isLoading ? 'Start' : 'Loading...'}
                    </Button>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
          </>
        )}
      </div>
    );
  }
}

export default Register;
