// user related api calls
import { publicAxios, privateAxios } from "./AxiosService";

// Register new user
export const registerUser = (userData) => {
  return publicAxios
    .post(`/users`, userData)
    .then((response) => response.data);
};

// Login user (gets accessToken + sets HttpOnly refresh cookie)
export const loginUser = (loginData) => {
  return publicAxios
    .post(`/auth/generate-token`, loginData, { withCredentials: true })
    .then((response) => response.data);
};

// Regenerate token using refresh cookie (no body needed now)
export const regenerateToken = () => {
  return publicAxios
    .post(`/auth/regenerate-token`) // no need to send body, cookie handles it
    .then((response) => response.data);
};



// Get user by ID
export const getUser = (userId) => {
  return privateAxios
    .get(`/users/${userId}`, { withCredentials: true })
    .then((response) => response.data);
};

// Update user details
export const updateUser = (user) => {
  return privateAxios
    .put(`/users/${user.userId}`, user, { withCredentials: true })
    .then((response) => response.data);
};

// Update profile picture
export const updateUserProfilePicture = (file, userId) => {
  if (!file) return;

  const data = new FormData();
  data.append("userImage", file);

  return privateAxios
    .post(`/users/image/${userId}`, data, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((response) => response.data);
};

// Get all users (admin only)
export const getAllUsers = (pageNumber, pageSize, sortBy, sortDir) => {
  return privateAxios
    .get(`/users?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`, { withCredentials: true })
    .then((res) => res.data);
};
