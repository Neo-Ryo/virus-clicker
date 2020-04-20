import React from "react";
import "./App.css";
import GamePage from "./components/gamepage/GamePage";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }
  render() {
    return (
      <div className="App">
        <GamePage />
      </div>
    );
  }
}

export default App;
