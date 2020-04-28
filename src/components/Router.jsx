import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import TeamMaker from "./TeamMaker";
import CreateTeamPage from "./CreateTeamPage"

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" />
        <Route path="/createteam" component={CreateTeamPage}/>
        <Route path="/jointeam" component={TeamMaker} />
        <Route path="/game" />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
