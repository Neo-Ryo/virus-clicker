import React from "react";

import { Container } from "semantic-ui-react";

import styles from "./titleInGame.module.css";

function TitleInGame({ counter }) {
  return (
    <Container textAlign="center">
      <h1 className={styles.titleInGame}>Virus clicker</h1>
      <p>score: {counter}</p>

      <p>Help us!{/* this text will change during the game */}</p>
    </Container>
  );
}

export default TitleInGame;
