import {privateAxios, publicAxios} from "./AxiosService";

//product related api calls

// //create product Incollection & InCategory
// export const createProductInCategoryAndCollection = (product,categoryId) => {
//     return privateAxios
//         .post(`/products/categories/${categoryId}/collections`,product)
//         .then((response) => response.data)
// };

// create product in category and collection (with images)
export const createProductInCategoryAndCollection = (formData, categoryId) => {
    return privateAxios
        .post(`/products/categories/${categoryId}/collections`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        })
        .then((response) => response.data);
};


//create product without category
export const createProductWithOutCategory = (product) => {
    return privateAxios
        .post(`/products`, product)
        .then((response)=> response.data)
};

//create product with category
export const createProductInCategory = (product, categoryId) => {
    return privateAxios
        .post(`/categories/${categoryId}/products`,product)
        .then((response)=> response.data)
};

//create product without collection
export const createProductWithOutCollection = (product) => {
    return privateAxios
        .post(`/products`, product)
        .then((response)=> response.data)
};

//create product with collection
export const createProductInCollection = (product, collectionId) => {
    return privateAxios
        .post(`/collections/${collectionId}/products`,product)
        .then((response)=> response.data)
};

// add multiple product images
export const addProductImages = (files, productId) => {
    const formData = new FormData();
    
    // append each file with the same key as backend expects
    files.forEach(file => {
        formData.append("productImages", file);
    });

    return privateAxios
        .post(`/products/image/${productId}`, formData)
        .then(response => response.data);
};

//get products
export const getAllProducts = (
    pageNumber = 0,
    pageSize = 10,
    sortBy = "addedDate",
    sortDir = "asc"
) => {
    return publicAxios
        .get(`/products?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`)
        .then((response)=>response.data);
};

//get all live products
export const getAllLiveProducts = (
    pageNumber = 0,
    pageSize = 10,
    sortBy = "addedDate",
    sortDir = "asc"
) => {
    return publicAxios
        .get(`/products/live?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`)
        .then((response)=>response.data);
};

//delete the product
export const deleteProduct = (productId) => {
    return privateAxios
    .delete(`/products/${productId}`)
    .then((response)=> response.data)
};

//partially update - stock/live
export const patchProduct = (updates, productId) => {
    return privateAxios
        .patch(`/products/${productId}`, updates)
        .then(response => response.data);
};


//update product with/without images
export const updateProduct = (product, images, productId) => {
    const formData = new FormData();
    
    // Add product JSON as a Blob
    formData.append("product", new Blob([JSON.stringify(product)], { type: "application/json" }));

    // Add images if any
    if (images && images.length > 0) {
        for (let i = 0; i < images.length; i++) {
            formData.append("images", images[i]);
        }
    }

    return privateAxios
        .put(`/products/${productId}`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        })
        .then(response => response.data);
};


//update the category of the product
export const updateProductCategory = (categoryId, productId) => {
    return privateAxios
    .put(`/categories/${categoryId}/products/${productId}`)
    .then((res) => res.data);
};

//search product service
export const searchProduct =(query) => {
    return publicAxios.get(`/products/search/${query}`).then((res)=> res.data);
};

//get single product detail 
export const getProduct = (productId) => {
    return publicAxios.get(`/products/${productId}`).then((res) => res.data);
};

//get products of categories
export const getProductsOfCategories = (
    categoryId,
    pageNumber,
    pageSize,
    sortBy='addedDate',
    sortDir='asc'
)=>{
    return publicAxios
    .get(`/categories/${categoryId}/products?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`)
    .then((res) => res.data);
};

// get products of specific collection
export const getProductsByCollection = (
  collectionId,
  pageNumber = 0,
  pageSize = 10,
  sortBy = "addedDate",
  sortDir = "asc"
) => {
  return publicAxios
    .get(`/products/collections/${collectionId}`, {
      params: {
        pageNumber,
        pageSize,
        sortBy,
        sortDir,
      },
    })
    .then((response) => response.data);
};
