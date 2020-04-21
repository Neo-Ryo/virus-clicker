import React from "react";
import Virus from "./images/virus.png";
import Tada from "react-reveal/Tada";
import styles from "./styles/virusButton.module.css";
import { Container, Image } from "semantic-ui-react";

class VirusButton extends React.Component {
  constructor(props) {
    super(props);
    this.increment = this.increment.bind(this);
    this.state = { counter: 0 };
  }
  increment() {
    this.setState({ counter: this.state.counter + 1 });
  }

  render() {
    return (
      <Container className={styles.virusLogoContainer}>
        <Tada spy={this.state.counter}>
          <Image
            centered
            className={styles.virusLogo}
            onClick={this.increment}
            src={Virus}
            alt="logo"
          />
        </Tada>
      </Container>
    );
  }
}

export default VirusButton;
