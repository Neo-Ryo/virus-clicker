import React from "react";
import TeamCards from "./TeamCards";
import { CarouselProvider, Slider } from "pure-react-carousel";
import axios from "axios";
import { Input, Card, Header, Form, Button, Image } from "semantic-ui-react";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      pseudo: "",
      teamUuid: null,
      wantCreateATeam: false,
      teamName: "",
      teamLogo: "",
      isLoading: false,
      displayPseudoInput: false,
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
      console.log(this.state.teams);
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
        this.state.teamUuid
      ) {
        await axios.post("https://virusclicker.herokuapp.com/users", {
          pseudo: this.state.pseudo,
          team: this.state.teamUuid,
        });
        alert("Vous êtes bien enregistré !");
      } else {
        console.log("This pseudo is already taken.");
      }
    } catch (error) {
      console.log(error);
      this.setState({ error: error.response.data.error });
    }
    this.setState({ isLoading: false });
  }

  async submitCreateTeam(event) {
    event.preventDefault();
    this.setState({ isLoading: true });
    try {
      const { data } = await axios.get(
        "https://virusclicker.herokuapp.com/teams"
      );
      console.log(data.uuid)
      if (
        !data.find(
          (team) =>
            team.name.toLowerCase() === this.state.teamName.toLowerCase()
        ) &&
        this.state.teamName
      ) {
        await axios.post("https://virusclicker.herokuapp.com/teams", {
          name: this.state.teamName,
          logo: this.state.teamLogo,
        });
        //alert("Vous êtes bien enregistré !");
      } else if (
        data.find(
          (team) =>
            team.name.toLowerCase() === this.state.teamName.toLowerCase()
        ) &&
        this.state.teamName
      ) {
        this.setState({ teamUuid: data.uuid });
        console.log(this.state.teamUuid);

        //} else {
        // console.log("This team name is already taken or your image is unvalid");
      } else if (
        data.find(
          (user) =>
            user.pseudo.toLowerCase() === this.state.pseudo.toLowerCase()
        ) &&
        this.state.teamUuid
      ) {
        await axios.post("https://virusclicker.herokuapp.com/users", {
          pseudo: this.state.pseudo,
          team: this.state.teamUuid,
        });
        alert("Vous êtes bien enregistré !");
      } else {
        console.log("This pseudo is already taken.");
      }
    } catch (error) {
      console.log(error);
      this.setState({ error: error.response.data.error });
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
    // console.log(id);
  }

  toggleCreationTeamPanel() {
    this.setState({ wantCreateATeam: !this.state.wantCreateATeam });
  }
  showPseudoInput() {
    this.setState({ displayPseudoInput: true });
  }

  render() {
    return (
      <>
        <Header as="h1" textAlign="center">
          Game Builder
        </Header>

        <Form onSubmit={this.submitJoinTeam}>
          {!this.state.wantCreateATeam && (
            <>
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
            </>
          )}

          {!this.state.wantCreateATeam && (
            <Button color="teal" type="submit" disabled={this.state.isLoading}>
              {!this.state.isLoading ? "Join the team !" : "Loading..."}
            </Button>
          )}
        </Form>
        <Button color="purple" onClick={this.toggleCreationTeamPanel}>
          {!this.state.wantCreateATeam ? "Create your team !" : "Join a team !"}
        </Button>

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
              <Button
                color="teal"
                type="submit"
                disabled={this.state.isLoading}
              >
                {!this.state.isLoading ? "Save Team" : "Loading..."}
              </Button>
            </Form>
          </>
        )}
      </>
    );
  }
}

export default Register;
