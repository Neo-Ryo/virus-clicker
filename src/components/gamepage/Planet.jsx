import React from 'react';
import PropTypes from 'prop-types';
import PLanetLogo from './images/earth.png';
import styles from './styles/planet.module.css';
import { Progress } from 'reactstrap';

export default function Planet({ percentage }) {
  const planetOpacity = percentage / 100;

  return (
    <>
       <img
        className={styles.logoplanet}
        src={PLanetLogo}
        alt="Planet logo" 
        style={{ opacity: planetOpacity, width: '60px', margin: '25% 0 25% 0' }}
      /> 
     
      <Progress animated color="warning" value={percentage} style={{width: '50px', margin: 'auto'}} />
    </>
  );
}

Planet.propTypes = {
  percentage: PropTypes.number.isRequired,
};
