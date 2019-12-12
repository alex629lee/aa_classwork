import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import {Route, Switch, Link} from "react-router-dom";
import ProductIndex from "./products/ProductIndex"
import Login from "./Login";
import AuthRoute from "../util/route_util";
import Nav from "./Nav";
import Register from "./Register";
import ProductDetail from "./products/ProductDetail";
import ProductCreate from "./products/CreateProduct";

const App = () => {
  return (
    <div>
      <Nav />
      <h1><Link to="/">Online Store</Link></h1>
     
      <Switch>
        <AuthRoute exact path="/login" component={Login} routeType="auth" />
        <AuthRoute exact path="/register" component={Register} routeType="auth" />
        <AuthRoute exact path="/products/new" component={ProductCreate} routeType="protected" />
        <AuthRoute exact path="/products/:productId" component={ProductDetail} routeType="protected" />
        
        <Route exact path="/" component={ProductIndex} />
      </Switch>
    </div>
  );
};

export default App;