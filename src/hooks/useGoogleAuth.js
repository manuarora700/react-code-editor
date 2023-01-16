import { useContext, useState } from "react";
import { auth } from "../components/authentication/firebase";
import {
    signInWithPopup,
    GoogleAuthProvider,
    signOut
} from "firebase/auth";
import { AuthContext } from "../contexts/AuthContext";

export const useGoogleAuth = () => {
    const { dispatch } = useContext(AuthContext);
    const [error, setError] = useState();
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const provider = new GoogleAuthProvider();

    const login = async () => {
        setError(null);
        setIsAuthenticating(true);

        try {
            const res = await signInWithPopup(auth, provider);

            if (!res) {
                throw new Error("Could not complete sign in")
            }

            const user = res.user;
            dispatch({ type: "LOGIN", payload: user})
            setIsAuthenticating(false);
        } catch (error) {
            console.log(error);
            setError(error.message);
            setIsAuthenticating(false);
        }
    }

    const logout = async () => {
        try {
            await signOut(auth);
            dispatch({ type: "LOGOUT"})
            console.log("User signed out")
        } catch (error) {
            console.log(error.message);
        }
    }

    return { login, error, isAuthenticating, logout }
}