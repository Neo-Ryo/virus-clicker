import React from 'react';
import { Container, Progress, Statistic } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import PLanetLogo from './images/earth.png';
import styles from './styles/planet.module.css';

export default function Planet({ percentage }) {
  return (
    <Container textAlign="center">
      <img className={styles.logoplanet} src={PLanetLogo} alt="Planet logo" />
      <Statistic size="small">
        <Statistic.Value>{`${percentage} %`}</Statistic.Value>
      </Statistic>
      <Progress progress percent={percentage} indicating />
    </Container>
  );
}

Planet.propTypes = {
  percentage: PropTypes.number.isRequired,
};
