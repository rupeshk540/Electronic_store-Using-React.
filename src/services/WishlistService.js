import { privateAxios } from "./AxiosService";


// Get wishlist of user
export const getWishlist = async (userId) => {
  const response = await privateAxios.get(`/wishlist/${userId}`);
  return response.data;
};

// Add product to wishlist
export const addToWishlist = async (userId, productId) => {
  const response = await privateAxios.post(`/wishlist/${userId}/products/${productId}`);
  return response.data;
};

// Remove product from wishlist
export const removeFromWishlist = async (userId, productId) => {
  const response = await privateAxios.delete(`/wishlist/${userId}/products/${productId}`);
  return response.data;
};

// Clear wishlist
export const clearWishlist = async (userId) => {
  const response = await privateAxios.delete(`/wishlist/clear/${userId}`);
  return response.data;
};