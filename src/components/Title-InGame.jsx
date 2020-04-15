import React, { Component } from "react";
// import VirusButton from "./components/VirusButton";
import "semantic-ui-css/semantic.min.css";
import "./Title-InGame.css";

class TitleInGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    };
  }
  render() {
    return (
      <div>
        <h1 className="title-in-game">Virus clicker</h1>
        <section className="score-count">
          <p>score: {this.state.counter}</p>

          <p>Help us!{/* this text will change during the game */}</p>
        </section>
      </div>
    );
  }
}
export default TitleInGame;
