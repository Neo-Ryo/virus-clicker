import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Register from './Register';
import GamePage from './gamepage/GamePage';
import StartVirusButton from './StartPage/StartVirusButton';
import TableScore from './TableScore';

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={StartVirusButton} />
        <Route path="/register" component={Register} />
        <Route path="/game" component={GamePage} />
        <Route path="/tableScore" component={TableScore} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
