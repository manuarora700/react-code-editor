import { useContext } from "react";
import GoogleButton from "react-google-button";
import { AuthContext } from "../../contexts/AuthContext";
import { useGoogleAuth } from "../../hooks/useGoogleAuth";
import UserNav from "./UserNav";

const AuthenticationView = () => {
    const { user } = useContext(AuthContext);
    const { login } = useGoogleAuth();

    return (
        <>
        {user ?
            <UserNav {...user} />:
            <GoogleButton onClick={login} />
        }
        </>
    )
}

export default AuthenticationView