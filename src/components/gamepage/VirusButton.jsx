import React from 'react';
import Tada from 'react-reveal/Tada';
import { Container, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Virus from './images/virus.png';
import styles from './styles/virusButton.module.css';

function VirusButton({ increment, counter }) {
  return (
    <Container className={styles.virusLogoContainer}>
      <Tada spy={counter}>
        <Image
          centered
          className={styles.virusLogo}
          onClick={increment}
          src={Virus}
          alt="logo"
        />
      </Tada>
    </Container>
  );
}

VirusButton.propTypes = {
  increment: PropTypes.number.isRequired,
  counter: PropTypes.number.isRequired,
};

export default VirusButton;
