import React from 'react';
import { Table, Button, Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import styles from './styles/tableScore.module.css';

class TableScoreInGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container className={styles.tableScore}>
        <Button size="mini" color="teal" onClick={() => ''} content="+" />
        <Table basic="very" celled collapsing>
          <p>Scores</p>
          {/* <Table.Body>
          {team
            .map((user) => (
              <>
                <Table.Row>
                  <Table.Cell>{user.rank}</Table.Cell>
                  <Table.Cell>
                    <Header as="h4" image>
                      <Image src={user.imageTeam} rounded size="mini" />
                      <Header.Content>
                        {user.pseudo}
                        <Header.Subheader>{user.teamName}</Header.Subheader>
                      </Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell>{user.score}</Table.Cell>
                </Table.Row>
              </>
            ))
            .sort()}
        </Table.Body> */}
        </Table>
      </Container>
    );
  }
}

TableScoreInGame.protoTypes = {
  teamsData: PropTypes.array.isRequired,
};

export default TableScoreInGame;
