import { Switch, Route } from "react-router-dom";
import React from "react";
import "../index.css";
import InTheater from "./inTheater";
import Login from "./Login";
import Watchlist from "./Watchlist";
import Movie from "./Movie";
import Account from "./Account";
import Explore from "./Explore";
import Search from "./Search";

const Body = () => (
  <Switch>
    <Route exact path="/" component={InTheater}></Route>
    <Route exact path="/Login" component={Login}></Route>
    <Route exact path="/Watchlist" component={Watchlist}></Route>
    <Route exact path="/Explore" component={Explore}></Route>
    <Route exact path="/Movie" component={Movie}></Route>
    <Route exact path="/Search" component={Search}></Route>
    <Route exact path="/Account" component={Account}></Route>
  </Switch>
);

export default Body;
