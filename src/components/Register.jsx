/* eslint-disable no-console */
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
  Container,
} from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import TeamCards from './TeamCards';

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
      } else console.log('nope');
    } catch (error) {
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
          .then(console.log(getUserUuid))
          .then(this.setState({ canPlayGame: true }))
          .then(window.localStorage.setItem('uuid', getUserUuid));
      } else {
        console.log('This pseudo is already taken.');
      }
    } catch (error) {
      console.log('error');
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
    } = this.state;
    if (canPlayGame) {
      return <Redirect to="/game" />;
    }
    return (
      <Container>
        <Header as="h1" textAlign="center" style={{ marginTop: '15px' }}>
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
            <Form onSubmit={this.submitJoinTeam}>
              <Form.Field style={{ margin: '15px' }}>
                <Input
                  placeholder="Pseudo"
                  value={pseudoUser}
                  name="pseudoUser"
                  onChange={this.handleChange}
                />
              </Form.Field>
              <CarouselProvider
                naturalSlideWidth={3}
                naturalSlideHeight={1.25}
                totalSlides={teams.length / 4} // import teams number
                style={{ width: '80vw' }}
              >
                <Slider>
                  <Card.Group>
                    {teams.map(({ uuid, logo, name }) => {
                      return (
                        <TeamCards
                          key={uuid}
                          image={logo}
                          header={name}
                          onClick={() => this.chooseTeam(uuid)}
                        />
                      );
                    })}
                  </Card.Group>
                </Slider>
              </CarouselProvider>
              {!wantCreateATeam && (
                <Button
                  color="teal"
                  type="submit"
                  value=""
                  disabled={isLoading}
                >
                  {!isLoading ? 'Join the team !' : 'Loading...'}
                </Button>
              )}
            </Form>
          </>
        )}

        {wantCreateATeam && (
          <>
            <Form onSubmit={this.submitCreateTeam}>
              <Input
                placeholder="Pseudo"
                label={{ color: 'red', corner: 'right', icon: 'asterisk' }}
                value={pseudoUser}
                name="pseudoUser"
                onChange={this.handleChange}
              />
              <Input
                placeholder="Team name"
                label={{ color: 'red', corner: 'right', icon: 'asterisk' }}
                value={teamName}
                name="teamName"
                onChange={this.handleChange}
              />
              <Input
                placeholder="Team Logo URL"
                label={{ color: 'red', corner: 'right', icon: 'asterisk' }}
                value={teamLogo}
                name="teamLogo"
                onChange={this.handleChange}
              />
              <Image style={{ width: 180, height: 180 }} src={teamLogo} />
              <Button color="teal" type="submit" disabled={isLoading}>
                {!isLoading ? 'Save Team' : 'Loading...'}
              </Button>
            </Form>
          </>
        )}
      </Container>
    );
  }
}

export default Register;
