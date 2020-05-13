import React from 'react';
import {
  Table,
  Button,
  Container,
  Header,
  Image,
  Loader,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Axios from 'axios';
import Flash from 'react-reveal/Flash';
import styles from './styles/tableScore.module.css';

class TableScoreInGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
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
        `https://virusclicker.herokuapp.com/users/${uuid}`
      );
      this.setState({
        uuid: res.data.TeamUuid,
      });
    } finally {
      this.setState({ isLoading: true });
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
    const arrayInOrder = teamsData.sort((a, b) => {
      return b.score - a.score;
    });
    const arrayFiltered = [];
    for (let i = 0; i < arrayInOrder.length; i += 1) {
      if (arrayInOrder[i].uuid === uuid) {
        arrayFiltered.push(
          arrayInOrder[i - 1],
          arrayInOrder[i],
          arrayInOrder[i + 1]
        );
      }

      this.setState({ arrayOk: arrayFiltered });
    }
  }

  render() {
    const { isLoading, uuid, arrayOk } = this.state;
    if (isLoading) {
      return <Loader active inline="centered" />;
    }

    return (
      <Container className={styles.tableScore}>
        <Table basic="very" celled collapsing unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Teams</Table.HeaderCell>
              <Table.HeaderCell>Scores</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {arrayOk
              .map((team) => (
                <>
                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Image
                          src={team.logo}
                          rounded
                          size="massive"
                          alt="teamLogo"
                        />
                        <Header.Content>
                          {team.name}
                          <Header.Subheader>
                            {team.users.length}
                            Team players
                          </Header.Subheader>
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>
                      {team.uuid === uuid ? (
                        <Flash>
                          <h3>{team.score}</h3>
                        </Flash>
                      ) : (
                        <>{team.score}</>
                      )}
                    </Table.Cell>
                  </Table.Row>
                </>
              ))
              .sort()}
          </Table.Body>
        </Table>
        <Link to="/tableScore">
          <Button size="mini" color="teal" onClick={() => ''} content="+" />
        </Link>
      </Container>
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
