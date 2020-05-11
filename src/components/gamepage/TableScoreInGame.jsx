import React from 'react';
import { Table, Button, Container, Header, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './styles/tableScore.module.css';

function TableScoreInGame({ teamsData }) {
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
          {teamsData
            .sort((a, b) => {
              return b.score - a.score;
            })
            .filter(
              (team) => team.logo && team.logo.length > 40 && team.score > 0
            )
            .map((team) => (
              <>
                <Table.Row>
                  <Table.Cell>
                    <Header as="h4" image>
                      <Image src={team.logo} rounded size="massive" />
                      <Header.Content>
                        {team.name}
                        <Header.Subheader>
                          {team.users.length}
                          Team players
                        </Header.Subheader>
                      </Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell>{team.score}</Table.Cell>
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

TableScoreInGame.propTypes = {
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
