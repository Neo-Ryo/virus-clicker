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
        <h5 className={styles.flashText}>You have unlock a new Skin!</h5>
      );
      break;
    case counter > 40 && counter < 50:
      skinMessage = (
        <h5 className={styles.flashText}>You have unlock a new Skin!</h5>
      );
      break;
    case counter > 60 && counter < 70:
      skinMessage = (
        <h5 className={styles.flashText}>You have unlock a new Skin!</h5>
      );
      break;
    case counter > 70:
      skinMessage = (
        <h5 className={styles.flashText}>Keep on smashing that Virus !</h5>
      );
      break;
    default:
      skinMessage = <h5 className={styles.flashText}>Smash that Virus !</h5>
  }
  return (
    <>
      <h3 className={styles.titleInGame}>Virus clicker</h3>
      <h5 className={styles.scoreCount}>{`Score : ${counter}`}</h5>
      <Flash>{skinMessage}</Flash>
    </>
  );
}

TitleInGame.propTypes = {
  counter: PropTypes.number.isRequired,
};

export default TitleInGame;
