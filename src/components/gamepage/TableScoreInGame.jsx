import React from "react";
import { Header, Image, Table, Button, Container } from "semantic-ui-react";
import styles from "./styles/tableScore.module.css";

function TableScoreInGame() {
  return (
    <Container className={styles.tableScore}>
      <Button size="mini" color="teal" onClick={() => ""} content="+"></Button>
      <Table basic="very" celled collapsing>
        <Table.Body>
          {team
            .map((user) => (
              <>
                <Table.Row>
                  <Table.Cell>#{user.rank}</Table.Cell>
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
        </Table.Body>
      </Table>
    </Container>
  );
}

export default TableScoreInGame;
