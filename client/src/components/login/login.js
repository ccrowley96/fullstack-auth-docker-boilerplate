import React from "react";
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import './login.scss';

export default function Login(){
    const responseGoogle = async (googleResponse) => {
        let response = await fetch(`/auth/googleLogin`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({tokenId: googleResponse.tokenId})
        });
    
        let parsedResponse = await response.json();
        localStorage.setItem('user', parsedResponse);
        console.log(parsedResponse);
    }

    return(
        <div className="googleLogin">
            <GoogleLogin
                clientId="10363954666-veq3jlluet0her48ntgbcvoqk8fdkof7.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                isSignedIn={true}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    ) 
}