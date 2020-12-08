import jwt_decode from "jwt-decode";
import React, { useContext, createContext, useState } from "react";
import { client } from '../App';

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
    let sessionString = localStorage.getItem('session');
    if(sessionString){
        let session = JSON.parse(sessionString);
        if(session){
            return session
        }
    }
    return null;
}

export function useProvideAuth(){
    let sessionFromStorage = getSessionFromLocalStorage();
    const [session, setSession] = useState(sessionFromStorage);

    const authenticateUser = (session, cb) => {
        setSession(session);
        localStorage.setItem('session', JSON.stringify(session));
        cb();
    }

    const deauthenticateUser = cb => {
        localStorage.removeItem('session');
        client.clearStore();
        setSession(null);
        cb();
    }

    const isUserAuthenticated = () => {
        let session = getSessionFromLocalStorage();
        if(session){
            let token = session.token;
            const { exp } = jwt_decode(token);
            const expirationTime = (exp * 1000);
            if(Date.now() >= expirationTime){
                localStorage.removeItem('session');
            } else{
                return true;
            }
        }
        return false;
    }

    const getToken = () => {
        let session = getSessionFromLocalStorage();
        return session?.token;
    }

    return {
        session, 
        authenticateUser, 
        deauthenticateUser,
        isUserAuthenticated,
        getToken
    }
}