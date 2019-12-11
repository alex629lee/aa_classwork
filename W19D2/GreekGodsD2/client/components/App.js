import React from "react";
import GodsList from "./gods/GodsList";
import { Route, Switch } from "react-router-dom";
import GodCreate from "./create/GodCreate";
import EmblemCreate from "./create/EmblemCreate";
import AbodeCreate from "./create/AbodeCreate";
import EmblemsList from "./emblems/EmblemsList.js";
import AbodesList from "./abodes/AbodesList";
import CreateIndex from "./create/CreateIndex";
import Navbar from "./nav/Navbar";
import GodDetail from "./gods/GodDetail.js";

const App = () => (
  <div>
    <Navbar />
    <Switch>
      <Route exact path="/gods/:id" component={GodDetail} />
      <Route exact path="/new" component={CreateIndex} />
      <Route exact path="/emblems" component={EmblemsList} />
      <Route exact path="/abodes" component={AbodesList} />
      <Route exact path="/gods/new" component={GodCreate} />
      <Route exact path="/emblems/new" component={EmblemCreate} />
      <Route exact path="/abodes/new" component={AbodeCreate} />
      <Route path="/" component={GodsList} />
    </Switch>
  </div>
);

export default App;

