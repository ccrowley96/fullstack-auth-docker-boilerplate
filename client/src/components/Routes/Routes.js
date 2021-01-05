import React from 'react';
import { useAuth } from '../../hooks/auth';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link,
} from "react-router-dom";
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Home from '../Home/Home';
import TopBar from '../TopBar/TopBar';

export default function Routes(){
  const auth = useAuth();
    return(
        <Router>
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
                
                <PrivateRoute path="/profile">
                    <TopBar />
                    <Profile user={auth?.session?.user}/>
                </PrivateRoute>
                <Route path="/">
                    <TopBar />
                    <Home />
                </Route>
            </Switch>
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