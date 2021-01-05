import React from "react";
import {
    useHistory,
    useLocation
} from "react-router-dom";
import { useAuth } from '../../hooks/auth';
import { GoogleLogout } from 'react-google-login';
import { useTheme } from "../../hooks/provideTheme";

import classNames from 'classnames/bind';
const cx = classNames.bind(require('./Logout.module.scss'));

export default function Logout(){
    let history = useHistory();
    let location = useLocation();
    const { theme } = useTheme()
    let auth = useAuth();

    const responseGoogle = async (googleResponse) => {
        // Set auth state
        auth.deauthenticateUser(() => history.replace('/login'));
    }

    if(auth.isUserAuthenticated() && location.pathname !== '/login'){
        return(
            <div className={cx('googleLogout')}>
                <GoogleLogout
                    theme={theme}
                    clientId="10363954666-veq3jlluet0her48ntgbcvoqk8fdkof7.apps.googleusercontent.com"
                    buttonText="Logout"
                    onLogoutSuccess={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
            </div>
        ) 
    } else{
        return null;
    }
}