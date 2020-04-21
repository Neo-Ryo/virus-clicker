import React from "react";
import Virus from "../virus.png";
import styles from "./startVirusButton.module.css";
import { Container, Image, Grid } from "semantic-ui-react";

class StartVirusButton extends React.Component {
  render() {
    return (
      <Grid centered>
        <Grid.Column mobile={13} tablet={11} computer={7}>
            <Image className={`${styles.startButton}`} src={Virus} alt="logo" />
        </Grid.Column>
      </Grid>
    );
  }
}

export default StartVirusButton;
