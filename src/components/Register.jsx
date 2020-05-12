import React from 'react';
import { CarouselProvider, Slider } from 'pure-react-carousel';
import axios from 'axios';
import {
  Input,
  Card,
  Header,
  Form,
  Button,
  Image,
  Grid,
  Loader,
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
      getuuid: '',
      wantCreateATeam: false,
      teamName: '',
      teamLogo: '',
      isLoading: false,
      canPlayGame: false,
      getUserUuid: '',
      error: false,
    };
    this.toggleCreationTeamPanel = this.toggleCreationTeamPanel.bind(this);
    this.chooseTeam = this.chooseTeam.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitJoinTeam = this.submitJoinTeam.bind(this);
    this.submitCreateTeam = this.submitCreateTeam.bind(this);
  }

  componentDidMount() {
    axios.get('https://virusclicker.herokuapp.com/teams').then((res) => {
      this.setState({ teams: res.data });
    });
    axios.get('https://virusclicker.herokuapp.com/users').then((res) => {
      this.setState({ users: res.data });
    });
  }

  async getTeams() {
    try {
      const { data } = await axios.get(
        `https://virusclicker.herokuapp.com/teams`
      );
      this.setState({
        teams: data,
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async submitCreateTeam(event) {
    const {
      teams,
      teamName,
      teamLogo,
      pseudoUser,
      users,
      getuuid,
      getUserUuid,
    } = this.state;
    event.preventDefault();
    this.setState({ isLoading: true });
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
        await axios
          .post('https:virusclicker.herokuapp.com/teams', {
            name: teamName,
            logo: teamLogo,
          })
          .then((res) => this.setState({ getuuid: res }));

        await axios
          .post('https://virusclicker.herokuapp.com/users', {
            pseudo: pseudoUser,
            team: getuuid.data.uuid,
          })
          .then(window.localStorage.setItem('uuid', getUserUuid))
          .then(this.setState({ canPlayGame: true }));
      } else {
        // eslint-disable-next-line no-console
        console.log('nope');
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error');
    }
    this.setState({ isLoading: false });
  }

  async submitJoinTeam(e) {
    const { teamUuid, getUserUuid, pseudoUser } = this.state;
    e.preventDefault(); // prevent page reload
    this.setState({ isLoading: true });
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
        axios
          .post('https://virusclicker.herokuapp.com/users', {
            pseudo: pseudoUser,
            team: teamUuid,
          })
          .then((res) => this.setState({ getUserUuid: res }))
          // eslint-disable-next-line no-console
          .then(console.log(getUserUuid))
          .then(this.setState({ canPlayGame: true }))
          .then(window.localStorage.setItem('uuid', getUserUuid));
      } else {
        // eslint-disable-next-line no-console
        console.log('This pseudo is already taken.');
      }
    } catch (err) {
      this.setState({ error: true });
    }
    this.setState({ isLoading: false });
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
    } = this.state;
    if (isLoading) {
      return <Loader />;
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
              <Form.Field style={{ margin: '15px' }}>
                <Input
                  required
                  placeholder="Pseudo"
                  value={pseudoUser}
                  name="pseudoUser"
                  onChange={this.handleChange}
                  label={{ color: 'red', corner: 'right', icon: 'asterisk' }}
                />
              </Form.Field>
              <CarouselProvider
                naturalSlideWidth={2}
                naturalSlideHeight={1.25}
                totalSlides={teams.length / 10} // import teams number
                style={{ width: 'auto', height: '120vw' }}
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
              <Form.Field style={{ margin: '15px' }}>
                <Input
                  placeholder="Pseudo"
                  label={{ color: 'red', corner: 'right', icon: 'asterisk' }}
                  value={pseudoUser}
                  name="pseudoUser"
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field style={{ margin: '15px' }}>
                <Input
                  placeholder="Team name"
                  label={{ color: 'red', corner: 'right', icon: 'asterisk' }}
                  value={teamName}
                  name="teamName"
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field style={{ margin: '15px' }}>
                <Input
                  placeholder="Team Logo URL"
                  label={{ color: 'red', corner: 'right', icon: 'asterisk' }}
                  value={teamLogo}
                  name="teamLogo"
                  onChange={this.handleChange}
                />
              </Form.Field>

              <Grid>
                <Grid.Row textAlign="center" columns={3}>
                  <Grid.Column width={10}>
                    <Image style={{ width: 180, height: 180 }} src={teamLogo} />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row textAlign="center" columns={1}>
                  <Grid.Column width={16}>
                    <Button
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
