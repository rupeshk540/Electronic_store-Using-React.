

// Save user data & access token after login
export const doLoginLocalStorage = (data) => {
  if (data) {
    localStorage.setItem("userData", JSON.stringify({
      token: data.token, // accessToken (short-lived)
      user: data.user,   // user info
    }));
  }
};

// Fetch complete stored object
export const getDataFromLocalStorage = () => {
  const data = localStorage.getItem("userData");
  return data ? JSON.parse(data) : null;
};

// Get user info only
export const getUserFromLocalStorage = () => {
  const data = getDataFromLocalStorage();
  return data ? data.user : null;
};

// Get access token only
export const getTokenFromLocalStorage = () => {
  const data = getDataFromLocalStorage();
  return data ? data.token : null;
};

//Check if user is logged in
export const isLoggedIn = () => {
  const token = getTokenFromLocalStorage();
  return !!token;
};

//Check if user is admin
export const isAdminUser = () => {
  const user = getUserFromLocalStorage();
  if (!user || !user.roles) return false;

  // Match admin role by ID or name
  return user.roles.some((role) =>
    role.roleId === "e8220e09-762a-451e-b9c2-b29c347ddb13" ||
    role.roleName?.toLowerCase() === "admin"
  );
};

//Logout: clear local data only (cookie will be cleared by backend)
export const doLogoutFromLocalStorage = () => {
  localStorage.removeItem("userData");
};
