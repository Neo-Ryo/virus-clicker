import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Register from './Register';
import GamePage from './gamepage/GamePage';
import StartVirusButton from './StartPage/StartVirusButton';

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={StartVirusButton} />
        <Route path="/register" component={Register} />
        <Route path="/game" component={GamePage} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
