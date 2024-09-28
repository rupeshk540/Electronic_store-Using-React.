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
            if(isJwtExpired(token)){
                setFlag(true);
                toast.error("Session Expired ! Relogin");
                logout();
                navigate("/login");
            }
        } catch (error) {
            
        }
    },[]);

    return flag;
   
};

export default useJwtTokenExpiration;