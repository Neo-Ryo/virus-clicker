import React, { Component } from "react";

import { Container } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import styles from "./titleInGame.module.css";

class TitleInGame extends Component {
  render() {
    const { counter } = this.props;
    return (
      <Container>
        <h1 className={styles.titleInGame}>Virus clicker</h1>
        <p>score: {counter}</p>

        <p>Help us!{/* this text will change during the game */}</p>
      </Container>
    );
  }
}
export default TitleInGame;
