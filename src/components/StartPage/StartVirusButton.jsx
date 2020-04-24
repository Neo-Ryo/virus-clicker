import React from "react";
import Virus from "../gamepage/images/virus.png";
import styles from "./startVirusButton.module.css";
import { Image, Grid, Button } from "semantic-ui-react";
import Zoom from "react-reveal/Zoom";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";

class StartVirusButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
    this.showButtons = this.showButtons.bind(this);
  }
  showButtons() {
    this.setState({ show: !this.state.show });
  }
  render() {
    return (
      <Zoom left>
        <Grid centered>
          <Grid.Row>
            <Image
              onClick={this.showButtons}
              className={`${styles.startButton} ${
                this.state.show
                  ? styles.virusButtonActive
                  : styles.virusButtonNotActive
              }`}
              src={Virus}
              alt="logo"
            />
          </Grid.Row>
          <Grid.Row>
            <Fade bottom when={this.state.show}>
              <Link to="/createteam">
                <Button className="ui purple button">Create a team</Button>
              </Link>
              <Link to="/jointeam">
                <Button className="ui purple button">Join a team</Button>
              </Link>
            </Fade>
          </Grid.Row>
        </Grid>
      </Zoom>
    );
  }
}

export default StartVirusButton;
