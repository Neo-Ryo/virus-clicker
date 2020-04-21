import React from "react";
import "./App.css";
import CreateTeamPage from "./components/CreateTeamPage";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }
  render() {
    return (
      <div className="App">
        <CreateTeamPage/>
      </div>
    );
  }
}

export default App;
