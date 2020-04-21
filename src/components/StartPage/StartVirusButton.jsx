import React from "react";
import Virus from "../virus.png";
import styles from "./startVirusButton.module.css";
import { Container, Image } from "semantic-ui-react";

class StartVirusButton extends React.Component {
  render() {
    return (
        <Container>
          <Image
            className={`${styles.startButton}`}
            src={Virus}
            alt="logo"
          />
        </Container>
    );
  }
}

export default StartVirusButton;
