import React from "react";

class TableScore extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            teamScore : 1000
        }
    }
  render() {
    return (
      <div className="TableScore">
        <table>
          <tr>
            <td>#353</td>
            <td>Team</td>
            <td>{this.state.teamScore}</td>
          </tr>
          <tr>
            <td>#354</td>
            <td>Team</td>
            <td>{this.state.teamScore}</td>
          </tr>
          <tr>
            <td>#355</td>
            <td>Team</td>
            <td>{this.state.teamScore}</td>
          </tr>
          <tr>
            <td>#356</td>
            <td>Team</td>
            <td>{this.state.teamScore}</td>
          </tr>
          <tr>
            <td>#357</td>
            <td>Team</td>
            <td>{this.state.teamScore}</td>
          </tr>
        </table>
      </div>
    );
  }
}

export default TableScore;
