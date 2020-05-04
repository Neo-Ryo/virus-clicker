import React from 'react';
import Tada from 'react-reveal/Tada';
import Zoom from 'react-reveal/Zoom';
import { Grid, Image } from 'semantic-ui-react';
import Virus from './images/virus.png';
import styles from './styles/virusButton.module.css';

class VirusButton extends React.Component {
  constructor(props) {
    super(props);
    this.increment = this.increment.bind(this);
    this.state = { counter: 0 };
  }

  increment() {
    const { counter } = this.state;
    return this.setState({ counter: counter + 1 });
  }

  render() {
    const { counter } = this.state;

    return (
      <Zoom left>
        <Grid.Row className={styles.virusLogoContainer}>
          <Tada spy={counter}>
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
