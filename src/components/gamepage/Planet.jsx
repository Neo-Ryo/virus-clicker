import React from 'react';
import { Container, Progress, Statistic, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import PLanetLogo from './images/earth.png';
import styles from './styles/planet.module.css';

export default function Planet({ percentage }) {
  let color = null;
  const opaciti = percentage / 100;
  if (percentage <= 30) {
    color = 'red';
  } else if (percentage > 30 && percentage < 50) {
    color = 'orange';
  } else if (percentage >= 50 && percentage < 70) {
    color = 'yellow';
  } else {
    color = 'green';
  }
  return (
    <Container textAlign="center">
      <Image
        className={styles.logoplanet}
        src={PLanetLogo}
        alt="Planet logo"
        style={{ opacity: opaciti }}
      />
      <Statistic size="tiny" color={color}>
        <Statistic.Value>{`${percentage} %`}</Statistic.Value>
      </Statistic>
      <Progress percent={percentage} indicating />
    </Container>
  );
}

Planet.propTypes = {
  percentage: PropTypes.number.isRequired,
};
