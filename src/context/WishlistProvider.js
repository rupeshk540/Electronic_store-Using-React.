import {  useCallback, useContext, useEffect, useState } from "react";
import { getWishlist, clearWishlist, removeFromWishlist, addToWishlist } from "../services/WishlistService";
import UserContext from "./UserContext";
import WishlistContext from "./WishlistContext";
import { toast } from "react-toastify";

const WishlistProvider = ({ children }) => {
  const { isLogin, userData } = useContext(UserContext);
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist initially
 const loadWishlist = useCallback(async (userId) => {
  try {
    const result = await getWishlist(userId);
    console.log(result);
    setWishlist(result.products || []);
  } catch (error) {
    console.error("Error loading wishlist:", error);
    setWishlist([]);
  }
}, []);

  useEffect(() => {

  if (isLogin && userData?.user?.userId) {

    loadWishlist(userData.user.userId);

  } else {

    setWishlist([]);

  }

}, [ isLogin,userData?.user?.userId,loadWishlist]);

  // Add product
  const addItemWishlist = async (productId) => {
    try {
      if (!isLogin) {
        toast.error("Please login to add products to wishlist");
        return;
      }
      await addToWishlist(userData.user.userId, productId);
      setWishlist(prevWishlist => [...prevWishlist, { productId }]);
      toast.success("Added to wishlist ❤️");
    } catch (error) {
      toast.error("Error adding to wishlist");
    }
  };

  // Remove product
  const removeItemWishlist = async (productId) => {
    try {
       await removeFromWishlist(userData.user.userId, productId);
      setWishlist(prevWishlist => prevWishlist.filter(item => item.productId !== productId));
      toast.warn("Removed from wishlist 💔");
    } catch (error) {
      toast.error("Error removing from wishlist");
    }
  };

  // Clear wishlist
  const clear = async () => {
    try {
      await clearWishlist(userData.user.userId);
      setWishlist([]);
      toast.info("Wishlist cleared");
    } catch (error) {
      toast.error("Error clearing wishlist");
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addItemWishlist, removeItemWishlist, clear }}>
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistProvider;