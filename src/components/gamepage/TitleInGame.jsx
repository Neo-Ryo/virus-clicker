import React from 'react';
import Flash from 'react-reveal/Flash';
import { Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import styles from './styles/titleInGame.module.css';

function TitleInGame({ counter }) {
  let skinMessage;
  switch (true) {
    case counter > 20 && counter < 30:
      skinMessage = (
        <h4 className={styles.flashText}>You have unlock a new Skin!</h4>
      );
      break;
    case counter > 40 && counter < 50:
      skinMessage = (
        <h4 className={styles.flashText}>You have unlock a new Skin!</h4>
      );
      break;
    case counter > 60 && counter < 70:
      skinMessage = (
        <h4 className={styles.flashText}>You have unlock a new Skin!</h4>
      );
      break;
    case counter > 70:
      skinMessage = (
        <h4 className={styles.flashText}>Keep on smashing that VIRUS!</h4>
      );
      break;
    default:
      skinMessage = 'Help us !';
  }
  return (
    <Container textAlign="center" className={styles.main}>
      <h1 className={styles.titleInGame}>Virus clicker</h1>
      <h4 className={styles.scoreCount}>{`SCORE : ${counter}`}</h4>
      <Flash>{skinMessage}</Flash>
    </Container>
  );
}

TitleInGame.propTypes = {
  counter: PropTypes.number.isRequired,
};

export default TitleInGame;
