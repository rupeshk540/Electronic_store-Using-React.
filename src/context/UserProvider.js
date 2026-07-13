import { useEffect, useState, useCallback, useRef } from "react";
import jwtDecode from "jwt-decode";
import UserContext from "./UserContext";
import {
  doLoginLocalStorage,
  doLogoutFromLocalStorage,
  getDataFromLocalStorage,
  isLoggedIn,
  isAdminUser as adminUser,
} from "../auth/HelperAuth";
import { regenerateToken } from "../services/UserService";

const UserProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const refreshTimer = useRef(null);

  // Update local auth state
  const updateUserState = useCallback(() => {
    const data = getDataFromLocalStorage();
    setIsLogin(isLoggedIn());
    setUserData(data);
    setIsAdminUser(adminUser());
  }, []);

   // Logout & clear everything
  const handleLogout = useCallback(() => {
    doLogoutFromLocalStorage();
    setIsLogin(false);
    setUserData(null);
    setIsAdminUser(false);
    if (refreshTimer.current) clearTimeout(refreshTimer.current);
  }, []);

  // Auto-refresh token 1 minute before expiry
  const scheduleTokenRefresh = useCallback(() => {
    const storedData = getDataFromLocalStorage();
    if (!storedData?.token) return;

    try {
      const { exp } = jwtDecode(storedData.token);
      const now = Date.now();
      const expiryTime = exp * 1000;
      const refreshTime = expiryTime - now - 60 * 1000; // 1 min before expiry

      if (refreshTimer.current) clearTimeout(refreshTimer.current);

      if (refreshTime > 0) {
        refreshTimer.current = setTimeout(async () => {
          try {
            //  Cookie automatically sent by browser
            const data = await regenerateToken();
            if (data?.token) {
              doLoginLocalStorage(data);
              updateUserState();
              scheduleTokenRefresh(); // re-schedule
            } else {
              handleLogout();
            }
          } catch (err) {
            console.error("Token refresh failed:", err);
            handleLogout();
          }
        }, refreshTime);
      }
    } catch (error) {
      console.error("JWT decode error:", error);
      handleLogout();
    }
  }, [updateUserState]);

  //On mount — try to auto-login via cookie refresh
  useEffect(() => {
    const tryAutoLogin = async () => {
      const storedData = getDataFromLocalStorage();

      if (storedData?.token) {
        updateUserState();
        scheduleTokenRefresh();
      } else {
        // Try regenerate-token using cookie
        try {
          const data = await regenerateToken(); // Cookie auto sent
          if (data?.token) {
            doLoginLocalStorage(data);
            updateUserState();
            scheduleTokenRefresh();
          } else {
            handleLogout();
          }
        } catch (err) {
          handleLogout();
        }
      }
    };

    tryAutoLogin();

    return () => {
      if (refreshTimer.current) clearTimeout(refreshTimer.current);
    };
  }, [updateUserState, scheduleTokenRefresh]);

  // Manual login (from login page)
  const doLogin = (data) => {
    doLoginLocalStorage(data);
    updateUserState();
    scheduleTokenRefresh();
  };


  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        isLogin,
        isAdminUser,
        setIsLogin,
        doLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

