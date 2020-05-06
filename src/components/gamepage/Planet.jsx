import React from 'react';
import { Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import PLanetLogo from './images/earth.png';
import styles from './styles/planet.module.css';

export default function Planet({ percentage }) {
  return (
    <Container textAlign="center">
      <img className={styles.logoplanet} src={PLanetLogo} alt="Planet logo" />
      <p className={styles.percentage}>{`${percentage} %`}</p>
    </Container>
  );
}

Planet.propTypes = {
  percentage: PropTypes.number.isRequired,
};
