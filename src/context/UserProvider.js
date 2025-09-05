import {  useContext, useEffect, useState } from "react";
import UserContext from "./UserContext";
import { doLoginLocalStorage, doLogoutFromLocalStorage,getDataFromLocalStorage, isLoggedIn,isAdminUser as adminUser } from "../auth/HelperAuth";


const UserProvider = ({children})=>{
    const [isLogin, setIsLogin]=useState(false);
    const[userData, setUserData]=useState(null);
    const [isAdminUser, setIsAdminUser]=useState(false);

    // userData:{
    //          user:{

    //          },
    //         jwtToken:""}
    //     }
   
    useEffect(()=>{
        setIsLogin(isLoggedIn());
        setIsAdminUser(adminUser())
        setUserData(getDataFromLocalStorage());
    },[]);


    // login
    const doLogin=(data)=>{
        doLoginLocalStorage(data);
        setIsLogin(true);
        setIsAdminUser(adminUser())
        setUserData(getDataFromLocalStorage());
    };

    // logout
    const doLogout = () =>{
        doLogoutFromLocalStorage();
        setIsLogin(false);
        setIsAdminUser(adminUser())
        setUserData(null);
    };


    return(
        <UserContext.Provider 
            value={{
                userData:userData,
                setUserData:setUserData,
                isLogin:isLogin,
                 isAdminUser:isAdminUser,   
                 setIsLogin:setIsLogin,
                 doLogin:doLogin,
                 logout:doLogout
             }}
        >
          
         {children}

        </UserContext.Provider>
    )
}

export default UserProvider;