import { Switch, Route, Redirect } from "react-router";
import NavBar from "./components/common/navBar";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import PageNotFound from "./components/common/pageNotFound";
import MovieDetail from "./components/movieDetail";
import React from "react";
import "./App.css";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import MovieForm from "./components/movieForm";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <main className="container">
        <Switch>
          <Route path="/register" component={RegisterForm}></Route>
          <Route path="/login" component={LoginForm}></Route>
          <Route path="/movies/new" component={MovieForm}></Route>
          <Route path="/movies/:id" component={MovieForm}></Route>
          <Route path="/movies" component={Movies}></Route>
          <Route path="/customers" component={Customers}></Route>
          <Route path="/rentals" component={Rentals}></Route>
          <Route path="/page-not-found" component={PageNotFound}></Route>
          <Redirect from="/" exact to="/movies"></Redirect>
          <Redirect to="/page-not-found"></Redirect>
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
