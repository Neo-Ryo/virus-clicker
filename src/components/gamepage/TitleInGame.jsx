import React from 'react';

import { Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import styles from './styles/titleInGame.module.css';

function TitleInGame({ counter }) {
  return (
    <Container textAlign="center">
      <h1 className={styles.titleInGame}>Virus clicker</h1>
      <p>{`score: ${counter}`}</p>
      <p>Help us!</p>
    </Container>
  );
}

TitleInGame.propTypes = {
  counter: PropTypes.number.isRequired,
};

export default TitleInGame;
