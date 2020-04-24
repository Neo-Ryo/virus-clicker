import React from "react";
import TeamCards from "./TeamCards";
import { CarouselProvider, Slider } from "pure-react-carousel";
import axios from "axios";
import { Input, Card } from "semantic-ui-react";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      pseudo: "",
      TeamUuid: null,
      wantCreateATeam: false,
      teamName: "",
      teamLogo: "",
      isLoading: false,
    };
    this.toggleCreationTeamPanel = this.toggleCreationTeamPanel.bind(this);
    this.chooseTeam = this.chooseTeam.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get("https://virusclicker.herokuapp.com/teams").then((res) => {
      this.setState({ teams: res.data });
      console.log(this.state.teams);
    });
  }

  async handleSubmit(e) {
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
        this.state.TeamUuid
      ) {
        await axios.post("https://virusclicker.herokuapp.com/users", {
          pseudo: this.state.pseudo,
          team: this.state.TeamUuid,
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
    this.setState({ TeamUuid: id });
    console.log(id);
  }

  toggleCreationTeamPanel() {
    this.setState({ wantCreateATeam: !this.state.wantCreateATeam });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
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
        <button onClick={this.toggleCreationTeamPanel}>
          Create your team !
        </button>
        {this.state.wantCreateATeam && (
          <>
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
          </>
        )}

        <button type="submit" disabled={this.state.isLoading}>
          {!this.state.isLoading ? "Send !" : "Loading..."}
        </button>
      </form>
    );
  }
}

export default Register;
