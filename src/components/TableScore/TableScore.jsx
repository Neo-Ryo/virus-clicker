import React from "react";
import { Header, Image, Table,Button} from "semantic-ui-react";
import "../style/tableScore.css";

class TableScore extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      users:{
        teamName :"Pokémon",
        imageTeam: "https://react.semantic-ui.com/images/avatar/small/lena.png",
        pseudo :"Lena",
        score :"150 000",
      }
    }
  }
  render() {
    return (
      <div id="tableScore">
        <Table basic="very" celled collapsing>
          <Table.Body>
            <Table.Row>
              <Table.Cell>#355</Table.Cell>
              <Table.Cell>
                <Header as="h4" image>
                  <Image
                    src={this.state.users.imageTeam}
                    rounded
                    size="mini"
                  />
                  <Header.Content>
                    {this.state.users.pseudo}
                    <Header.Subheader>{this.state.users.teamName}</Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>{this.state.users.score}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <Button color='teal'onClik={()=>""}>
        +
      </Button>
      </div>
    );
  }
}

export default TableScore;
