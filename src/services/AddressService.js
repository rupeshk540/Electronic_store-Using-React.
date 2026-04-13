import { privateAxios } from "./AxiosService";


// Add a new address for a user
export const addAddress = async (userId, addressData) => {
  try {
    const response = await privateAxios.post(`/addresses/${userId}`, addressData);
    console.log(response);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding address:", error);
    throw error;
  }
};

// Get all addresses of a user
export const getAddressesOfUser = async (userId) => {
  try {
    const response = await privateAxios.get(`/addresses/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user addresses:", error);
    throw error;
  }
};

// Get a single address by ID
export const getAddress = async (addressId) => {
  try {
    const response = await privateAxios.get(`/addresses/${addressId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching address:", error);
    throw error;
  }
};

// Update address by ID
export const updateAddress = async (addressId, addressData) => {
  try {
    const response = await privateAxios.put(`/addresses/${addressId}`, addressData);
    return response.data;
  } catch (error) {
    console.error("Error updating address:", error);
    throw error;
  }
};

// Delete address by ID
export const deleteAddress = async (addressId) => {
  try {
    await privateAxios.delete(`/addresses/${addressId}`);
  } catch (error) {
    console.error("Error deleting address:", error);
    throw error;
  }
};
