import React from 'react';
import { Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Table, Badge, Button, Container, Row, Col } from 'reactstrap';

import Axios from 'axios';
import Flash from 'react-reveal/Flash';
import { Link } from 'react-router-dom';
import Avatar from './pika.png';

class TableScoreInGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      arrayOk: [],
    };
    this.getUser = this.getUser.bind(this);
    this.filterData = this.filterData.bind(this);
    this.functionTwo = this.functionTwo.bind(this);
  }

  componentDidMount() {
    this.functionTwo();
  }

  componentDidUpdate(prevProps) {
    const { counter } = this.props;
    if (counter !== prevProps.counter) {
      this.functionTwo();
    }
  }

  async getUser() {
    const uuid = window.localStorage.getItem('uuid');
    try {
      const res = await Axios.get(
        `https://virus-clicker.herokuapp.com/users/${uuid}`
      );
      this.setState({
        uuid: res.data.TeamUuid,
      });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  async functionTwo() {
    try {
      await this.getUser();
      this.filterData();
    } finally {
      this.setState({ isLoading: false });
    }
  }

  filterData() {
    const { teamsData } = this.props;
    const { uuid } = this.state;
    const arrayInOrder = teamsData
      .filter((team) => team.logo.includes('PokeAPI'))
      .sort((a, b) => {
        return b.score - a.score;
      });
    const arrayFiltered = [];
    for (let i = 0; i < arrayInOrder.length; i += 1) {
      if (arrayInOrder[i].uuid === uuid) {
        if (arrayInOrder[i - 1] && arrayInOrder[i + 1]) {
          arrayFiltered.push(
            arrayInOrder[i - 1],
            arrayInOrder[i],
            arrayInOrder[i + 1]
          );
        } else if (!arrayInOrder[i - 1]) {
          arrayFiltered.push(
            arrayInOrder[i],
            arrayInOrder[i + 1],
            arrayInOrder[i + 2]
          );
        } else {
          arrayFiltered.push(
            arrayInOrder[i - 2],
            arrayInOrder[i - 1],
            arrayInOrder[i]
          );
        }
      }
      this.setState({ arrayOk: arrayFiltered });
    }
  }

  render() {
    const { isLoading, uuid, arrayOk } = this.state;
    const { counter } = this.props;
    if (isLoading) {
      return <Loader active inline="centered" />;
    }
    let skinMessage;
    switch (true) {
      case counter > 20 && counter < 30:
        skinMessage = (
          <h4 style={{ color: '#000066', fontFamily: 'Bangers' }}>
            New Skin unlocked !
          </h4>
        );
        break;
      case counter > 40 && counter < 50:
        skinMessage = (
          <h4 style={{ color: '#000066', fontFamily: 'Bangers' }}>
            New Skin unlocked !
          </h4>
        );
        break;
      case counter > 60 && counter < 70:
        skinMessage = (
          <h4 style={{ color: '#000066', fontFamily: 'Bangers' }}>
            New Skin unlocked !
          </h4>
        );
        break;
      case counter > 70:
        skinMessage = (
          <h4 style={{ color: '#000066', fontFamily: 'Bangers' }}>
            Keep going !
          </h4>
        );
        break;
      case counter > 100:
        skinMessage = (
          <h4 style={{ color: '#000066', fontFamily: 'Bangers' }}>
            Don't Stop !
          </h4>
        );
        break;
      default:
        skinMessage = '';
    }

    return (
      <>
        <Table borderless style={{ margin: '15px 0 0 0', width: '95%' }}>
          <tbody>
            {arrayOk

              .map((team) => (
                <tr>
                  <td style={{ verticalAlign: 'middle', padding: 0 }}>
                    <img
                      src={isLoading ? Avatar : team.logo}
                      style={{ width: '80px' }}
                      alt="teamLogo"
                    />
                  </td>
                  <td
                    style={{
                      verticalAlign: 'middle',
                      textAlign: 'start',
                      padding: 0,
                    }}
                  >
                    <h5>{team.name}</h5>
                    <Badge color="secondary">{`${team.users.length}Players`}</Badge>
                  </td>

                  <td style={{ verticalAlign: 'middle' }}>
                    {team.uuid === uuid ? (
                      <Flash>
                        <Badge style={{ width: '60px' }} color="warning" pill>
                          {team.score}
                        </Badge>
                      </Flash>
                    ) : (
                      <Badge style={{ width: '60px' }} color="warning" pill>
                        {team.score}
                      </Badge>
                    )}
                  </td>
                  {/* <td style={{ verticalAlign: 'middle', padding: 0 }}>
                    <img
                      src={isLoading ? Avatar : team.logo}
                      style={{ width: '80px' }}
                      alt="teamLogo"
                    />
                  </td> */}
                </tr>
              ))
              .sort()}
          </tbody>
        </Table>
        <Container>
          <Row>
            <Col
              xs={{ size: '8', offset: 2 }}
              sm={{ size: '8', offset: 2 }}
              md={{ size: '8', offset: 2 }}
              lg={{ size: '8', offset: 2 }}
            >
              <Flash>{skinMessage}</Flash>
            </Col>
            <Col xs="2" sm="2" md="2" lg="2" style={{ textAlign: 'end' }}>
              <Link to="/tableScore">
                <Button
                  size="sm"
                  style={{ width: '30px' }}
                  onClick={() => ''}
                  color="danger"
                >
                  +
                </Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

TableScoreInGame.propTypes = {
  counter: PropTypes.number.isRequired,
  teamsData: PropTypes.arrayOf(
    PropTypes.shape({
      uuid: PropTypes.string,
      name: PropTypes.string,
      logo: PropTypes.string,
      createdAt: PropTypes.string,
      updatedAt: PropTypes.string,
      users: PropTypes.shape({
        uuid: PropTypes.string,
        pseudo: PropTypes.string,
        score: PropTypes.number,
        createdAt: PropTypes.string,
        updatedAt: PropTypes.string,
        Teamuuid: PropTypes.string,
      }),
    })
  ).isRequired,
};

export default TableScoreInGame;
