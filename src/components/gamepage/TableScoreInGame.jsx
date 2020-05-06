import React from 'react';
import { Table, Button, Container, Header, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import styles from './styles/tableScore.module.css';

function TableScoreInGame({ teamsData }) {
  return (
    <Container className={styles.tableScore}>
      <Button size="mini" color="teal" onClick={() => ''} content="+" />
      <Table basic="very" celled collapsing>
        <Table.Body>
          {teamsData
            .filter(team => team.logo && team.logo.length > 40 && team.score > 0 )
            .map((team) => (
              <>
                <Table.Row>
                  <Table.Cell>
                    <Header as="h4" image>
                      <Image src={team.logo} rounded size="mini" />
                      <Header.Content>
                        {team.name}
                        <Header.Subheader>{team.users.length} Team players</Header.Subheader>
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
    </Container>
  );
}

TableScoreInGame.protoTypes = {
  teamsData: PropTypes.array.isRequired,
};

export default TableScoreInGame;
