/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React from 'react';
import Tada from 'react-reveal/Tada';
import { Container, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Virus from './images/virus.png';
import VirusRed from './images/virusRed.png';
import VirusBlue from './images/virusBlue.png';
import VirusWtf from './images/virusWtf.png';
import styles from './styles/virusButton.module.css';

function VirusButton({
  increment,
  counter,
  skinTwo,
  skinOne,
  skinThree,
  skinWtf,
}) {
  return (
    <Container className={styles.virusLogoContainer}>
      <Tada spy={counter}>
        <Image
          centered
          className={styles.virusLogo}
          onClick={increment}
          src={
            skinTwo
              ? VirusRed
              : skinOne
              ? Virus
              : skinThree
              ? VirusBlue
              : skinWtf
              ? VirusWtf
              : ''
          }
          alt="logo"
        />
      </Tada>
    </Container>
  );
}

VirusButton.propTypes = {
  counter: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
};

export default VirusButton;
