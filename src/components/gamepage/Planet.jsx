import React from 'react';
import PropTypes from 'prop-types';
import PLanetLogo from './images/earth.png';
import styles from './styles/planet.module.css';
import { Progress } from 'reactstrap';

export default function Planet({ percentage }) {
  const roundPercent = percentage.toFixed(2);
  let color = null;
  const planetOpacity = percentage / 100;
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
    <>
       <img
        className={styles.logoplanet}
        src={PLanetLogo}
        alt="Planet logo" 
        style={{ opacity: planetOpacity, width: '50px' }}
      /> 
     
      <Progress animated color="warning" value={percentage} style={{width: '50px', margin: 'auto'}} />
    </>
  );
}

Planet.propTypes = {
  percentage: PropTypes.number.isRequired,
};
