import jwt_decode from "jwt-decode";
import React, { useContext, createContext, useState } from "react";

const authContext = createContext();

export function ProvideAuth({children}){
    const auth = useProvideAuth();

    return(
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    );
}

export function useAuth(){
    return useContext(authContext);
}

const getSessionFromLocalStorage = () => {
    let sessionString = localStorage.getItem('user');
    if(sessionString){
        let session = JSON.parse(sessionString);
        if(session){
            return session
        }
    }
    return null;
}

export function useProvideAuth(){
    let userFromStorage = getSessionFromLocalStorage()?.user;
    const [user, setUser] = useState(userFromStorage);

    const authenticateUser = (user, cb) => {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        cb();
    }

    const deauthenticateUser = cb => {
        localStorage.removeItem('user');
        setUser(null);
        cb();
    }

    const isUserAuthenticated = () => {
        let user = getSessionFromLocalStorage();
        if(user){
            let token = user.token;
            const { exp } = jwt_decode(token);
            const expirationTime = (exp * 1000);
            if(Date.now() >= expirationTime){
                localStorage.removeItem('user');
            } else{
                return true;
            }
        }
        return false;
    }

    const getToken = () => {
        let userString = localStorage.getItem('user');
        if(userString){
            let user = JSON.parse(userString);
            return user.token;
        }
        return null;
    }

    return {
        user, 
        authenticateUser, 
        deauthenticateUser,
        isUserAuthenticated,
        getToken
    }
}