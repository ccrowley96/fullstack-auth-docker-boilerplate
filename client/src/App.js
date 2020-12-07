import React, { useContext, createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import Login from './components/login/login';
import './App.scss';

export default function App() {
  return (
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <h2>Public Home page</h2>
          </Route>
          <Route path="/profile">
            <h2>Protected user profile route</h2>
          </Route>
        </Switch>
      </Router>
  );
}

