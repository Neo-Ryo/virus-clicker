import React from "react";
import TeamCards from "./TeamCards";
import { CarouselProvider, Slider } from "pure-react-carousel";
import axios from "axios";
import {
  Input,
  Card,
  Header,
  Form,
  Button,
  Image,
  Grid,
  Container,
} from "semantic-ui-react";
import { Redirect } from "react-router-dom";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      users: [],
      pseudo: "",
      teamUuid: null,
      getuuid: "",
      wantCreateATeam: false,
      teamName: "",
      teamLogo: "",
      isLoading: false,
      displayPseudoInput: false,
      canPlayGame: false,
      usersAfterSubmit: [],
      getUserUuid: "",
    };
    this.toggleCreationTeamPanel = this.toggleCreationTeamPanel.bind(this);
    this.chooseTeam = this.chooseTeam.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitJoinTeam = this.submitJoinTeam.bind(this);
    this.submitCreateTeam = this.submitCreateTeam.bind(this);
  }

  componentDidMount() {
    axios.get("https://virusclicker.herokuapp.com/teams").then((res) => {
      this.setState({ teams: res.data });
    });
    axios.get("https://virusclicker.herokuapp.com/users").then((res) => {
      this.setState({ users: res.data });
    });
  }

  async submitJoinTeam(e) {
    e.preventDefault(); // prevent page reload
    this.setState({ isLoading: true });
    try {
      const { data } = await axios.get(
        "https://virusclicker.herokuapp.com/users"
      );

      if (
        !data.find(
          (user) =>
            user.pseudo.toLowerCase() === this.state.pseudo.toLowerCase()
        ) &&
        this.state.teamUuid &&
        this.state.pseudo
      ) {
        axios
          .post("https://virusclicker.herokuapp.com/users", {
            pseudo: this.state.pseudo,
            team: this.state.teamUuid,
          })
          .then((res) => this.setState({ getUserUuid: res }))
          .then(console.log(this.state.getUserUuid))
          .then(window.localStorage.setItem("uuid", this.state.getUserUuid))
          .then(this.setState({ canPlayGame: true }));
        alert("Vous êtes bien enregistré !");
      } else {
        console.log("This pseudo is already taken.");
      }
    } catch (error) {
      console.log("error");
    }
    this.setState({ isLoading: false });
  }

  async submitCreateTeam(event) {
    event.preventDefault();
    this.setState({ isLoading: true });

    try {
      if (
        !this.state.teams.find(
          (team) =>
            team.name.toLowerCase() === this.state.teamName.toLowerCase()
        ) &&
        this.state.teamName &&
        this.state.teamLogo &&
        this.state.pseudo &&
        !this.state.users.find(
          (user) =>
            user.pseudo.toLowerCase() === this.state.pseudo.toLowerCase()
        )
      ) {
        await axios
          .post("https:virusclicker.herokuapp.com/teams", {
            name: this.state.teamName,
            logo: this.state.teamLogo,
          })
          .then((res) => this.setState({ getuuid: res }));

        await axios
          .post("https://virusclicker.herokuapp.com/users", {
            pseudo: this.state.pseudo,
            team: this.state.getuuid.data.uuid,
          })
          .then(this.setState({ canPlayGame: true }));
      } else console.log("nope");
    } catch (error) {
      console.log("error");
    }
    this.setState({ isLoading: false });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  getTeams = async () => {
    try {
      const { data } = await axios.get(
        "https://virusclicker.herokuapp.com/teams"
      );
      this.setState({
        teams: data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  chooseTeam(id) {
    this.setState({ teamUuid: id });
  }

  toggleCreationTeamPanel() {
    this.setState({ wantCreateATeam: !this.state.wantCreateATeam });
  }

  render() {
    const { canPlayGame } = this.state;
    if (canPlayGame) {
      return <Redirect to="/game" />;
    }
    return (
      <Container>
        <Header as="h1" textAlign="center">
          Game Builder
        </Header>
        <Grid divided="vertically">
          <Grid.Row columns={4}>
            <Grid.Column width={3}>
              <h3>
                {!this.state.wantCreateATeam
                  ? "Join a team !"
                  : "Create your team !"}
              </h3>
            </Grid.Column>
            <Grid.Column>
              <Button color="purple" onClick={this.toggleCreationTeamPanel}>
                {!this.state.wantCreateATeam
                  ? "Or Create your team !"
                  : "Back to join a team !"}
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        {!this.state.wantCreateATeam && (
          <>
            <Form onSubmit={this.submitJoinTeam}>
              <Input
                placeholder="Pseudo"
                label={{ color: "red", corner: "right", icon: "asterisk" }}
                value={this.state.pseudo}
                name="pseudo"
                onChange={this.handleChange}
              />

              <CarouselProvider
                naturalSlideWidth={3}
                naturalSlideHeight={1.25}
                totalSlides={this.state.teams.length / 4} //import teams number
                style={{ width: "80vw" }}
              >
                <Slider>
                  <Card.Group>
                    {this.state.teams.map(({ uuid, logo, name }) => {
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
              {!this.state.wantCreateATeam && (
                //              <Link to={this.state.canPlayGame ? "/game/:uuid": "/game"}>
                <Button
                  color="teal"
                  type="submit"
                  value=""
                  disabled={this.state.isLoading}
                  onClick={this.state.changePage}
                >
                  {!this.state.isLoading ? "Join the team !" : "Loading..."}
                </Button>
                // </Link>
              )}
            </Form>
          </>
        )}

        {this.state.wantCreateATeam && (
          <>
            <Form onSubmit={this.submitCreateTeam}>
              <Input
                placeholder="Pseudo"
                label={{ color: "red", corner: "right", icon: "asterisk" }}
                value={this.state.pseudo}
                name="pseudo"
                onChange={this.handleChange}
              />
              <Input
                placeholder="Team name"
                label={{ color: "red", corner: "right", icon: "asterisk" }}
                value={this.state.teamName}
                name="teamName"
                onChange={this.handleChange}
              />
              <Input
                placeholder="Team Logo URL"
                label={{ color: "red", corner: "right", icon: "asterisk" }}
                value={this.state.teamLogo}
                name="teamLogo"
                onChange={this.handleChange}
              />
              <Image
                style={{ width: 180, height: 180 }}
                src={this.state.teamLogo}
              ></Image>
              {/* <Link to={this.state.canPlayGame ? `/game` : ""}> */}
              <Button
                color="teal"
                type="submit"
                disabled={this.state.isLoading}
              >
                {!this.state.isLoading ? "Save Team" : "Loading..."}
              </Button>
              {/* </Link> */}
            </Form>
          </>
        )}
      </Container>
    );
  }
}

export default Register;
