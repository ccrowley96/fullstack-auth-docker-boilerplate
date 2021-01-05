import React, { useContext, useReducer, useMemo } from "react";
import { actionTypes } from "../constants/constants";

const AppStateContext = React.createContext();
export const useAppState = () => useContext(AppStateContext);

const initialAppState = {
    
}
  
const AppStateReducer = (state, action) =>{
    switch(action.type){
        /* Example reducer for setting active modal
        case actionTypes.SET_ACTIVE_MODAL:
            return {...state, activeModal: action.payload}
        */
        default:
            throw new Error();
    }
}

export const ProvideAppState = ({children}) =>{
    const appState = useProvideAppState();
    return(
        <AppStateContext.Provider value={appState}>
            {children}
        </AppStateContext.Provider>
    )
}

const useProvideAppState = () => {
    const [appState, appDispatch] = useReducer(AppStateReducer, initialAppState);

    const appStateContextValue = useMemo(() => {
        return { appState, appDispatch };
    }, [appState, appDispatch]);

    return appStateContextValue;
}