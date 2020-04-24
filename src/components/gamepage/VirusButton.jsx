import React from "react";
import Virus from "./images/virus.png";
import Tada from "react-reveal/Tada";
import Zoom from "react-reveal/Zoom";
import { Grid, Image } from "semantic-ui-react";
import styles from "./styles/virusButton.module.css";

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
      <Zoom left>
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
      </Zoom>
    );
  }
}

export default VirusButton;
