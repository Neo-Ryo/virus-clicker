import React, { Component } from "react";

import { Container } from "semantic-ui-react";

import styles from "./titleInGame.module.css";

function TitleInGame() {
  const { counter } = this.props;
  return (
    <Container>
      <h1 className={styles.titleInGame}>Virus clicker</h1>
      <p>score: {counter}</p>

      <p>Help us!{/* this text will change during the game */}</p>
    </Container>
  );
}

export default TitleInGame;
