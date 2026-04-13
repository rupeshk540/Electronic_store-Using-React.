import { useContext, useEffect, useState } from "react";
import { addAddress, getAddressesOfUser } from "../services/AddressService";
import AddressContext from "./AddressContext";
import UserContext from "./UserContext";

export const AddressProvider = ({ children }) => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const {isLogin,userData} = useContext(UserContext)
    //Load addresses from backend
     useEffect(() => {
      if (isLogin && userData?.user.userId) {
        fetchAddresses(userData.user.userId);
      }
    }, [isLogin, userData?.user.userId]); 

  // Fetch addresses from backend
  const fetchAddresses = async (userId) => {
    try {
      const res = await getAddressesOfUser(userId); // API call
      setAddresses(res || []);
      console.log(res)
      if (res.length > 0) setSelectedAddress(res.data[0]);
    } catch (err) {
      console.error("Failed to fetch addresses", err);
    }
  };

  // Add new address
  const createAddress = async (addressData) => {
    try {
      const res = await addAddress(userData.user.userId,addressData);
      setAddresses((prev) => [...prev, res]);
      setSelectedAddress(res); // auto-select new address
      return res;
    } catch (err) {
      console.error("Failed to create address", err);
    }
  };


  return (
    <AddressContext.Provider
      value={{
        addresses,
        selectedAddress,
        setSelectedAddress,
        fetchAddresses,
        createAddress
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export default AddressProvider;