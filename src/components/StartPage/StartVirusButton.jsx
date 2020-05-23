import React from 'react';
import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';
import { Link } from 'react-router-dom';
import styles from './startVirusButton.module.css';
import Virus from '../gamepage/images/virus.png';
import { Button, Container, Row, Col } from 'reactstrap';

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
      
        <Zoom left>
          <Container>
            <Row>
              <Col
                style={{ textAlign: 'center' }}
                xs={{ size: 12, offset: 0 }}
                sm={{ size: 12, offset: 0 }}
                md={{ size: 4, offset: 4 }}
                lg={{ size: 6, offset: 3 }}
              >
                <h1
                  style={{
                    marginTop: '50px',
                    marginBottom: '50px',
                  }}
                >
                  Virus Clicker
                </h1>
                <img
                  onClick={this.showButtons}
                  className={`${styles.startButton} ${
                    show
                      ? styles.virusButtonActive
                      : styles.virusButtonNotActive
                  }`}
                  src={Virus}
                  alt="logo"
                />
                <Fade bottom when={show}>
                  {uuid ? (
                    <Link to={`/game/${uuid}`}>
                      <Button
                        color="danger"
                        size="lg"
                        style={{
                          marginTop: '30px',
                        }}
                      >
                        Go!
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/register">
                      <Button
                        color="danger"
                        size="lg"
                        style={{
                          marginTop: '30px',
                        }}
                      >
                        Register
                      </Button>
                    </Link>
                  )}
                </Fade>
              </Col>
            </Row>
          </Container>
        </Zoom>
      
    );
  }
}

export default StartVirusButton;
