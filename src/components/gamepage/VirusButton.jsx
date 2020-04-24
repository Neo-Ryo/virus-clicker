import React from "react";
import Virus from "./images/virus.png";
import Tada from "react-reveal/Tada";
import styles from "./styles/virusButton.module.css";
import { Container, Image } from "semantic-ui-react";

class VirusButton extends React.Component {
  render() {
    const { increment, counter } = this.props;
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
}

export default VirusButton;
