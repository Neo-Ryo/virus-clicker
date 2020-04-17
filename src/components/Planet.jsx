import React from "react";
import { Container } from "semantic-ui-react";
import PLanetLogo from "./earth.png";
import styles from "./planet.module.css";

const total = 1000;
const nbClick = 450; /* valeur a récuperer du total de click de l equipe*/
const pourcentage = (total - nbClick) / 10;
export default function Planet() {
  return (
    <Container textAlign="center">
      <img className={styles.logoplanet} src={PLanetLogo} alt="Planet logo" />
      <p className={styles.percentage}>{pourcentage}%</p>
    </Container>
  );
}
