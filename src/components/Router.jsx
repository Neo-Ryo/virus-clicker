import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import StartVirusButton from "./StartPage/StartVirusButton"

import TeamMaker from "./TeamMaker";


function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={StartVirusButton}/>
        <Route path="/register" component={TeamMaker} />
        <Route path="/game" />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
