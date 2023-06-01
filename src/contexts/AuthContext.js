import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useEffect, useReducer } from "react"
import { auth } from "../components/authentication/firebase";
import { authReducer } from "../reducers/authReducer";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        authIsReady: false
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            dispatch({type: "AUTH_IS_READY", payload: user})
        })

        return unsubscribe;
    }, []);

    return ( 
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;