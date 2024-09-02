//user related api calls

import { publicAxios,privateAxios } from "./AxiosService";


//register new user
export const registerUser = (userData)=>{
    return publicAxios
    .post(`/users`,userData)
    .then((response)=> response.data);
};

//login user
export const loginUser=(loginData)=>{
    return publicAxios
    .post(`/auth/login`,loginData)
    .then((response)=>response.data)
};

//api call for user info 

export const getUser=(userId)=>{
    publicAxios.get(`/users/${userId}`).then((response)=>response.data);
};

//update user section

export const updateUser=(user)=>{
    return privateAxios
    .put(`/users/${user.userId}`,user)
    .then ((response)=>response.data);
};

//update user profile picture
export const updateUserProfilePicture=(file, userId)=>{
    if(file==null){
        return;
    }
    const data=new FormData();
    data.append("userImage", file);
    return privateAxios
        .post(`/users/image/${userId}`,data)
        .then((response)=>response.data);
};