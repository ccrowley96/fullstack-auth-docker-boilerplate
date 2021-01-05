import React from "react";
import {
    useHistory,
    useLocation
} from "react-router-dom";
import { useAuth } from '../../hooks/auth';
import { GoogleLogin } from 'react-google-login';
import { useTheme } from "../../hooks/provideTheme";

import classNames from 'classnames/bind';
const cx = classNames.bind(require('./Login.module.scss'));

export default function Login(){
    let history = useHistory();
    let location = useLocation();
    const { theme } = useTheme();
    let auth = useAuth();

    let { from } = location.state || { from: { pathname: "/" } };
    
    const responseGoogle = async (googleResponse) => {
        console.log(googleResponse)
        let response = await fetch(`/auth/googleLogin`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({tokenId: googleResponse.tokenId})
        });

        if(response.status === 200){
            let parsedResponse = await response.json();
            // Set auth state
            auth.authenticateUser(parsedResponse, () => history.push(from));
        } else{
            console.log('Google login failed')
        }
    }

    return(
        <div className={cx('loginWrapper')}>
            <h3 className={cx('loginTitle')}>Login to continue</h3>
            <div className={cx('googleLogin')}>
                <GoogleLogin
                    theme={theme}
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