import React from 'react';
import { Header, Image, Grid, Button } from 'semantic-ui-react';
import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';
import { Link } from 'react-router-dom';
import styles from './startVirusButton.module.css';
import Virus from '../gamepage/images/virus.png';

class StartVirusButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      uuid: '',
    };
    this.showButtons = this.showButtons.bind(this);
  }

  showButtons() {
    const { show } = this.state;
    if (window.localStorage.getItem('uuid')) {
      this.setState({ uuid: window.localStorage.getItem('uuid') });
      this.setState({ show: !show });
    } else {
      this.setState({ show: !show });
    }
  }

  render() {
    const { show, uuid } = this.state;
    return (
      <div
        style={{ minHeight: '102vh', margin: '0px !important' }}
        className={styles.backgrd}
      >
        <Zoom left>
          <Grid centered>
            <Grid.Row style={{ height: '80vw' }}>
              <Header className={styles.title} as="h1">
                Virus Clicker
              </Header>
            </Grid.Row>
            <Grid.Row>
              <Image
                onClick={this.showButtons}
                className={`${styles.startButton} ${
                  show ? styles.virusButtonActive : styles.virusButtonNotActive
                }`}
                src={Virus}
                alt="logo"
              />
            </Grid.Row>
            <Grid.Row>
              <Fade bottom when={show}>
                {uuid ? (
                  <Link to={`/game/${uuid}`}>
                    <Button color="teal">Go!</Button>
                  </Link>
                ) : (
                  <Link to="/register">
                    <Button className="ui purple button">Register</Button>
                  </Link>
                )}
              </Fade>
            </Grid.Row>
          </Grid>
        </Zoom>
      </div>
    );
  }
}

export default StartVirusButton;
