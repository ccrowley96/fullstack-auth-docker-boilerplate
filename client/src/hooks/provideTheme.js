import React, { useContext, useEffect, useState } from "react";
import { themes } from '../constants/constants'

const Theme = React.createContext();
export const useTheme = () => useContext(Theme);

export const ProvideTheme = ({children}) =>{
    const theme = useProvideTheme();
    return(
        <Theme.Provider value={theme}>
            {children}
        </Theme.Provider>
    )
}

const useProvideTheme = () => {
    const initialTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : themes.light;

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', initialTheme);
    }, [initialTheme])

    const [theme, setTheme] = useState(initialTheme);

    const toggleTheme = () => {
        if(theme === themes.dark){
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', themes.light);
            setTheme(themes.light)
        } else{
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', themes.dark);
            setTheme(themes.dark)
        }
    }

    return {theme, toggleTheme}
}