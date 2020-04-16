import React from "react";
import "./App.css";
import TitleInGame from "./components/TitleInGame";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }
  render() {
    return (
      <div className="App">
        <TitleInGame counter={this.state.counter} />
      </div>
    );
  }
}

export default App;
