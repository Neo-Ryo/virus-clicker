import React from "react";
import "./App.css";
import TitleInGame from "./components/TitleInGame";
import User from './components/UserInfos';
import VirusButton from './components/VirusButton';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }
  render() {
    return (
      <div className="App">
        <User/>
        <TitleInGame counter={this.state.counter} />
        <VirusButton />
      </div>
    );
  }
}

export default App;
