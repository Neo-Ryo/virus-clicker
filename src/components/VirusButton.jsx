import React from "react";
import Virus from "./virus.png";
import Tada from "react-reveal/Tada";
import styles from "./virusButton.module.css";
import { Grid, Image } from "semantic-ui-react";

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
      <Grid.Row className={styles.virusLogoContainer}>
        <Tada spy={this.state.counter}>
          <Image
            className={styles.virusLogo}
            onClick={this.increment}
            src={Virus}
            alt="logo"
          />
        </Tada>
      </Grid.Row>
    );
  }
}

export default VirusButton;
