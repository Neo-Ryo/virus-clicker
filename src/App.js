import React from 'react';
import user from './components/user_infos';
import axios from 'axios';

function App() {
  return (
    <div className="App">
      <user id={this.state.id} logo={this.state.logo} team={this.state.team}/>
    </div>
  );
}

export default App;
