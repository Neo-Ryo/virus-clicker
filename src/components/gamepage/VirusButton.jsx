import React from 'react';
import Tada from 'react-reveal/Tada';
import { Container, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Virus from './images/virus.png';
import VirusRed from './images/virusRed.png';
import VirusBlue from './images/virusBlue.png';
import VirusWtf from './images/virusWtf.png';
import styles from './styles/virusButton.module.css';

function VirusButton({ increment, counter, rhume, lepre, sida, covid19 }) {
  const imgSource = () => {
    const virus1 = VirusRed;
    const virus2 = Virus;
    const virus3 = VirusBlue;
    const virus4 = VirusWtf;

    if (rhume) {
      return virus1;
    }
    if (lepre) {
      return virus2;
    }
    if (sida) {
      return virus3;
    }
    if (covid19) {
      return virus4;
    }
    return '';
  };
  return (
    <Container className={styles.virusLogoContainer}>
      <Tada spy={counter}>
        <Image
          centered
          className={styles.virusLogo}
          onClick={increment}
          src={imgSource}
          alt="logo"
        />
      </Tada>
    </Container>
  );
}

VirusButton.propTypes = {
  counter: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
  rhume: PropTypes.func.isRequired,
  lepre: PropTypes.func.isRequired,
  sida: PropTypes.func.isRequired,
  covid19: PropTypes.func.isRequired,
};

export default VirusButton;
