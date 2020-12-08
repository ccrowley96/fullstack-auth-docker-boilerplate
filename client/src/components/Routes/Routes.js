import React, { useCallback } from 'react';
import { useAuth } from '../../services/auth';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link,
} from "react-router-dom";
import Login from '../Login/Login';
import Logout from '../Logout/Logout';
import Profile from '../Profile/Profile';

export default function Routes(){
  const auth = useAuth();
    return(
        <Router>
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
                <PrivateRoute path="/profile">
                    <h3>Profile page</h3>
                    <NavLink to="/" text="Home" />
                    <Profile user={auth?.session?.user}/>
                    <i>This is private content</i>
                </PrivateRoute>
                <Route path="/">
                    <h3>Home page</h3>
                    <NavLink to="/profile" text="Profile" />
                    <i>This is public content</i>
                </Route>
            </Switch>
            <Logout/>
        </Router>
    )
}

function NavLink({to, text}){
  return(
    <div style={{position: "absolute", top: "20px", right: "140px"}}>
      <Link to={to}>{text}</Link>
    </div>
  )
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
    let auth = useAuth();
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth.isUserAuthenticated() ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }