import React from "react";
import Virus from "../virus.png";
import styles from "./startVirusButton.module.css";
import { Image, Grid } from "semantic-ui-react";
import Zoom from "react-reveal/Zoom";

class StartVirusButton extends React.Component {
  render() {
    return (
      <Grid centered>
        <Grid.Column mobile={13} tablet={11} computer={7}>
          <Zoom left>
            <Image className={`${styles.startButton}`} src={Virus} alt="logo" />
          </Zoom>
        </Grid.Column>
      </Grid>
    );
  }
}

export default StartVirusButton;
