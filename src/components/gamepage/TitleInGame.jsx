import React from 'react';

import { Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import styles from './styles/titleInGame.module.css';

function TitleInGame({ counter }) {
  return (
    <Container textAlign="center" className={styles.main}>
      <h1 className={styles.titleInGame}>Virus clicker</h1>
      <p className={styles.scoreCount}>{`score: ${counter}`}</p>
      <p className={styles.scoreCount}>Help us!</p>
    </Container>
  );
}

TitleInGame.propTypes = {
  counter: PropTypes.number.isRequired,
};

export default TitleInGame;
