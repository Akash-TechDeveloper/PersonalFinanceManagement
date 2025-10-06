/* eslint-disable react/prop-types */
import React,{createContext,useState,useEffect} from 'react'

export const UserContext =createContext();
export const UserProvider = ({children})=>{
    
    const  [username, setUsername] = useState(null);
    

    return(
        <React.Fragment>
        <UserContext.Provider value={{username, setUsername}}>
            {children}
        </UserContext.Provider>
        </React.Fragment>
    )
};

