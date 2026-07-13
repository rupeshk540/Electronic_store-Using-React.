import { isJwtExpired } from "jwt-check-expiration";
import {getTokenFromLocalStorage} from "../auth/HelperAuth";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserContext from "../context/UserContext";

const useJwtTokenExpiration = () => {
    const [flag, setFlag] = useState(false);
    const navigate = useNavigate();
    const {logout} = useContext(UserContext);

   useEffect(() => {

    const token = getTokenFromLocalStorage();

    try {

            if (token && isJwtExpired(token)) {

                setFlag(true);

                toast.error("Session Expired ! Relogin");

                logout();

                navigate("/login");
            }

        } catch (error) {
            console.error("JWT expiration check failed:", error);
        }

    }, [logout, navigate]);

    return flag;
   
};

export default useJwtTokenExpiration;