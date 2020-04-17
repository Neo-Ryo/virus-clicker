import React from "react";
import { Header, Image, Table, Button } from "semantic-ui-react";
import styles from "./style/tableScore.module.css";

const team = [
  {
    teamName: "Digimon",
    imageTeam: "https://react.semantic-ui.com/images/avatar/small/lena.png",
    pseudo: "Xena",
    score: "1 000 000",
    rank: 3,
  },
  {
    teamName: "YuGiHo",
    imageTeam: "https://react.semantic-ui.com/images/avatar/small/lena.png",
    pseudo: "Seito Kaiba",
    score: "9 000 000",
    rank: 2,
  },
  {
    teamName: "Heroes of The Storm",
    imageTeam: "https://react.semantic-ui.com/images/avatar/small/lena.png",
    pseudo: "Neo Ryo",
    score: "7 944",
    rank: 1,
  },
];

class TableScoreInGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: {
        teamName: "Pokémon",
        imageTeam: "https://react.semantic-ui.com/images/avatar/small/lena.png",
        pseudo: "Lena",
        score: "150 000",
        rank: "355",
      },
    };
  }
  render() {
    return (
      <div id="tableScore">
        <Button className={styles.buttonTable} color="teal" onClik={() => ""}>
          +
        </Button>
        <Table basic="very" celled collapsing>
          <Table.Body>
            {team.map((user) => (
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
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default TableScoreInGame;
