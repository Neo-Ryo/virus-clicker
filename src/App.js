import React from "react";
import "./App.css";
import TeamMaker from "./components/TeamMaker";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }
  render() {
    return (
      <div className="App">
        <TeamMaker />
      </div>
    );
  }
}

export default App;
