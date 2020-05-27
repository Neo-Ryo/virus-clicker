import React from 'react';
import Flash from 'react-reveal/Flash';
import PropTypes from 'prop-types';
import styles from './styles/titleInGame.module.css';

function TitleInGame({ counter }) {
  let skinMessage;
  switch (true) {
    case counter > 20 && counter < 30:
      skinMessage = (
        <h5 className={styles.flashText}>New Skin unlocked !</h5>
      );
      break;
    case counter > 40 && counter < 50:
      skinMessage = (
        <h5 className={styles.flashText}>New Skin unlocked !</h5>
      );
      break;
    case counter > 60 && counter < 70:
      skinMessage = (
        <h5 className={styles.flashText}>New Skin unlocked !</h5>
      );
      break;
    case counter > 70:
      skinMessage = (
        ""
      );
      break;
    default:
      skinMessage = ""
  }
  return (
    <>
      <h3 className={styles.titleInGame}>Virus clicker</h3>
      {/* <h6 className={styles.scoreCount}>{`Score : ${counter}`}</h6> */}
      {/* <Flash>{skinMessage}</Flash> */}
    </>
  );
}

TitleInGame.propTypes = {
  counter: PropTypes.number.isRequired,
};

export default TitleInGame;
