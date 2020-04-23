import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import StartVirusButton from "./StartPage/StartVirusButton"


function Router() {
  return (
    <BrowserRouter>
        <Switch>
          <Route exact path="/" component={StartVirusButton}/>
          <Route path="/createteam" />
          <Route path="/jointeam"  />
          <Route path="/game"  />
        </Switch>
    </BrowserRouter>
  );
}

export default Router;
