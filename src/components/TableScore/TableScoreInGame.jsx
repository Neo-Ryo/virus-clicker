import React from "react";
import { Header, Image, Table, Button, Container } from "semantic-ui-react";
import styles from "./style/tableScore.module.css";

const team = [
  {
    teamName: "Digimon",
    imageTeam: "https://react.semantic-ui.com/images/avatar/small/lena.png",
    pseudo: "Xena",
    score: "1 000 000",
    rank: 1,
  },
  {
    teamName: "YuGiHo",
    imageTeam: "https://react.semantic-ui.com/images/avatar/small/lena.png",
    pseudo: "Seito Kaiba",
    score: "19 000 000",
    rank: 2,
  },
  {
    teamName: "Heroes of The Storm",
    imageTeam: "https://react.semantic-ui.com/images/avatar/small/lena.png",
    pseudo: "Neo Ryo",
    score: "7 944",
    rank: 3,
  },
];

function TableScoreInGame() {
  return (
    <Container>
      <Button size="mini" color="teal" onClick={() => ""} content="+"></Button>
      <Table className={styles.tableScore} basic="very" celled collapsing>
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
