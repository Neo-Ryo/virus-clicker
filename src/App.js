import React from "react";
import "./App.css";
import Router from "./components/Router";
import TeamMaker from "./components/TeamMaker";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }
  render() {
    return (
      <div className="App">
        <Router />
      </div>
    );
  }
}

export default App;
