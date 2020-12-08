import React from "react";
import {
    useHistory,
    useLocation
} from "react-router-dom";
import { useAuth } from '../../services/auth';
import { GoogleLogin } from 'react-google-login';
import './Login.scss';

export default function Login(){
    let history = useHistory();
    let location = useLocation();
    let auth = useAuth();

    let { from } = location.state || { from: { pathname: "/" } };
    
    const responseGoogle = async (googleResponse) => {
        let response = await fetch(`/auth/googleLogin`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({tokenId: googleResponse.tokenId})
        });
    
        let parsedResponse = await response.json();

        // Set auth state
        auth.authenticateUser(parsedResponse, () => history.push(from));
    }

    return(
        <div className="loginWrapper">
            <h3 className="loginTitle">Login to continue</h3>
            <div className="googleLogin">
                <GoogleLogin
                    clientId="10363954666-veq3jlluet0her48ntgbcvoqk8fdkof7.apps.googleusercontent.com"
                    buttonText="Login with Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    // isSignedIn={true} auto logs in user
                    cookiePolicy={'single_host_origin'}
                />
            </div>
        </div>
    ) 
}