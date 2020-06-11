import React from 'react';
import Tada from 'react-reveal/Tada';
import { Container, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Virus from './images/virus.png';
import VirusRed from './images/virusRed.png';
import VirusBlue from './images/virusBlue.png';
import VirusWtf from './images/virusWtf.png';
import styles from './styles/virusButton.module.css';

function VirusButton({ increment, counter, lepre, sida, covid19 }) {
  let sickness = Virus;
  switch (true) {
    case lepre:
      sickness = VirusRed;
      break;
    case sida:
      sickness = VirusBlue;
      break;
    case covid19:
      sickness = VirusWtf;
      break;
    default:
      sickness = Virus;
  }

  return (
    <Container className={styles.virusLogoContainer}>
      <Tada spy={counter}>
        <Image
          centered
          className={styles.virusLogo}
          onClick={increment}
          src={sickness}
          alt="logo"
          style={{ width: '70%' }}
        />
      </Tada>
    </Container>
  );
}

VirusButton.propTypes = {
  counter: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
  lepre: PropTypes.string.isRequired,
  sida: PropTypes.string.isRequired,
  covid19: PropTypes.string.isRequired,
};

export default VirusButton;
