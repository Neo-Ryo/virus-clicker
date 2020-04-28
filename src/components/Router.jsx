import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Register from "./Register";
import GamePage from "./gamepage/GamePage";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" />
        <Route path="/register" component={Register} />
        <Route path="/game" component={GamePage} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;