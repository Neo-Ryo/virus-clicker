import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";


function Router() {
  return (
    <BrowserRouter>
        <Switch>
          <Route exact path="/"  />
          <Route path="/createteam" />
          <Route path="/jointeam"  />
          <Route path="/game"  />
        </Switch>
    </BrowserRouter>
  );
}

export default Router;
