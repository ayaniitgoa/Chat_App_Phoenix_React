import React from "react";
import Groups from "./Groups";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import EachGroup from "./EachGroup";

function MainComponent() {
  return (
    <Router>
      <div className="">
        <Switch>
          <Route path="/" exact component={Groups} />
          <Route path="/:id" exact component={EachGroup} />
        </Switch>
      </div>
    </Router>
  );
}

export default MainComponent;
