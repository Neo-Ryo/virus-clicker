import React from 'react';
import Zoom from 'react-reveal/Zoom';
import axios from 'axios';
import {
  Table,
  Container,
  Header,
  Image,
  Rating,
  Loader,
} from 'semantic-ui-react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import styles from './gamepage/styles/GamePage.module.css';

class TableScore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamsData: [],
      isLoading: true,
    };

    this.getOk = this.getOk.bind(this);
  }

  componentDidMount() {
    this.getOk();
  }

  async getOk() {
    try {
      const uuid = window.localStorage.getItem('uuid');
      const res = await axios.get(`http://localhost:8000/users/${uuid}`);
      this.setState({ counter: res.data.score });
      const resTeams = await axios.get(`http://localhost:8000/teams`);
      this.setState({ teamsData: resTeams.data });

      this.setState((prevState) => ({
        ...prevState,
        teamsData: prevState.teamsData.map((team) => {
          return {
            ...team,
            score: team.Users.map((user) => user.score).reduce(
              (somme, score) => somme + score,
              0
            ),
          };
        }),
      }));

      this.setState({ isLoading: false });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { teamsData, isLoading } = this.state;
    if (isLoading) {
      return (
        <Container style={{ paddingTop: '300px' }}>
          <Loader inverted active inline="centered" size="huge">
            Loading
          </Loader>
        </Container>
      );
    }
    return (
      <div className={styles.main}>
        <Container>
          <Zoom left>
            <Table basic="very" celled unstackable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Logos</Table.HeaderCell>
                  <Table.HeaderCell>Teams</Table.HeaderCell>
                  <Table.HeaderCell>Scores</Table.HeaderCell>
                  <Table.HeaderCell>Rating</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {teamsData
                  .sort((a, b) => {
                    return b.score - a.score;
                  })
                  .filter((team) => team.logo.includes('PokeAPI'))
                  .map((team) => (
                    <Table.Row key={team.name}>
                      <Table.Cell>
                        <Image src={team.logo} rounded size="mini" />
                      </Table.Cell>
                      <Table.Cell>
                        <Header as="h4" image>
                          <Header.Content>{team.name}</Header.Content>
                        </Header>
                      </Table.Cell>
                      <Table.Cell>{team.score}</Table.Cell>
                      <Table.Cell>
                        {/* eslint-disable-next-line consistent-return */}
                        {(() => {
                          if (team.score === 0) {
                            return (
                              <Rating
                                maxRating={5}
                                defaultRating={0}
                                icon="star"
                              />
                            );
                          }
                          if (team.score < 1000 && team.score > 0) {
                            return (
                              <Rating
                                maxRating={5}
                                defaultRating={1}
                                icon="star"
                              />
                            );
                          }
                          if (team.score < 2500 && team.score >= 1000) {
                            return (
                              <Rating
                                maxRating={5}
                                defaultRating={2}
                                icon="star"
                              />
                            );
                          }
                          if (team.score < 10000 && team.score >= 2500) {
                            return (
                              <Rating
                                maxRating={5}
                                defaultRating={3}
                                icon="star"
                              />
                            );
                          }
                          if (team.score < 50000 && team.score >= 10000) {
                            return (
                              <Rating
                                maxRating={5}
                                defaultRating={4}
                                icon="star"
                              />
                            );
                          }
                          if (team.score >= 50000) {
                            return (
                              <Rating
                                maxRating={5}
                                defaultRating={5}
                                icon="star"
                              />
                            );
                          }
                        })()}
                      </Table.Cell>
                    </Table.Row>
                  ))
                  .sort()}
              </Table.Body>
            </Table>
            <Link to="/game">
              <Button type="button" color="danger">
                Back
              </Button>
            </Link>
          </Zoom>
        </Container>
      </div>
    );
  }
}

export default TableScore;
