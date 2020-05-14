import React from 'react';
// import Flash from 'react-reveal/Flash';
import { Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import styles from './styles/titleInGame.module.css';

function TitleInGame({ counter }) {
  return (
    <Container textAlign="center" className={styles.main}>
      <h1 className={styles.titleInGame}>Virus clicker</h1>
      <p className={styles.scoreCount}>{`score: ${counter}`}</p>
      {/* {counter > 20 && counter < 30 ? (
        <Flash>
          <p className={styles.scoreCount}>You have unlock a new Skin !</p>
        </Flash>
      ) : counter > 40 && counter < 50 ? (
        <Flash>
          <p className={styles.scoreCount}>You have unlock a new Skin !</p>
        </Flash>
      ) : counter > 60 && counter < 70 ? (
        <Flash>
          <p className={styles.scoreCount}>You have unlock a new Skin !</p>
        </Flash>
      ) : (
        <p className={styles.scoreCount}>Help Us !!</p>
      )} */}
      <p className={styles.scoreCount}>Help Us !!</p>
    </Container>
  );
}

TitleInGame.propTypes = {
  counter: PropTypes.number.isRequired,
};

export default TitleInGame;
