import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";


function Router() {
  return (
    <BrowserRouter>
        <Switch>
          <Route exact path="/" component={StartVirusButton} />
          <Route path="/createteam" component={CreateTeamPage} />
          <Route path="/jointeam" component={JoinTeam} />
          <Route path="/game" component={GamePage} />
        </Switch>
    </BrowserRouter>
  );
}
