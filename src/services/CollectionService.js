import {privateAxios} from "./AxiosService";

//add collection
export const addCollection=(collection)=>{
    return privateAxios
        .post(`/collections`,collection)
        .then((response)=>response.data);
};


//get all collections
export const getAllCollections = (currentPage=0, pageSize=10) => {
    return privateAxios
    .get(`/collections?pageNumber=${currentPage}& pageSize=${pageSize}`)
    .then((response)=>response.data);
};

//delete collection
export const deleteCollection = (collectionId) => {
    return privateAxios
    .delete(`/collections/${collectionId}`)
    .then((response)=>response.data);
}

//update collection
export const updateCollection = (collection) => {
    return privateAxios
        .put(`/collections/${collection.collectionId}`,collection)
        .then((response)=>response.data);
}