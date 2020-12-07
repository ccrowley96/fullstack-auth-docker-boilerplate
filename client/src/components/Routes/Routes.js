import { useAuth } from '../../services/auth';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import Login from '../Login/Login';
import Logout from '../Logout/Logout';
import Profile from '../Profile/Profile';

export default function Routes(){
    let auth = useAuth();
    return(
        <Router>
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
                <PrivateRoute path="/profile">
                    <TempPageHeader title={"Profile page"}/>
                    <Profile/>
                </PrivateRoute>
                <Route path="/">
                    <TempPageHeader title={"Home page"}/>
                </Route>
            </Switch>
            <Logout/>
        </Router>
    )
}

function TempPageHeader({title}){
    return(
        <div style={{position: 'relative', top: '0px', left: '20px'}}>
            <h3>{title}</h3>
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