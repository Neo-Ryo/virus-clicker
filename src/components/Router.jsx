import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import TeamMaker from "./TeamMaker";
import Register from "./Register";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" />
        <Route path="/createteam" />
        <Route path="/jointeam" component={TeamMaker} />
        <Route path="/register" component={Register} />
        <Route path="/game" />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
