import React, { useCallback, useContext, useEffect, useState } from 'react'
import CartContext from './CartContext';
import UserContext from "./UserContext";
import { addItemToCart, clearTheCart, getCart, removeItemFromCart } from '../services/CartService';
import { toast } from 'react-toastify';
import { Alert } from 'react-bootstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const CartProvider = ({children}) => {
    const {isLogin, userData} = useContext(UserContext);
    const [cart, setCart] = useState({items: []});
    


    //load user cart initially
   const loadUserCart = useCallback(async (userId) => {
        try {
            const cart = await getCart(userId);
            setCart({...cart});
        } catch (error) {
            setCart({items:[]});
        }
    }, []);

    useEffect(() => {

        if(isLogin && userData?.user?.userId){

            loadUserCart(userData.user.userId);

        }else{

            setCart({items:[]});

        }

    }, [isLogin, userData?.user?.userId, loadUserCart]);

    //add item to cart
    const addItemCart = async(quantity, productId, next) => {
        try {
            if(!isLogin){
                MySwal.fire({
                    title: "Not Logged In",
                    html: (
                        <>
                        <Alert className='border border-0' variant='danger'>Please do login to add items to cart !!</Alert>
                        </>
                    ),
                    icon: 'error'
                })
                return;
            }
            const result = await addItemToCart(
                userData.user.userId,
                productId,
                quantity
            )
            setCart({...result});
            next();
        } catch (error) {
            toast.error("Error in adding product in cart !!")
        }
    };

    //remove item from cart
    const removeItemCart = async (itemId) => {
        setCart(prev => ({
            ...prev,
            items: prev.items.filter(item => item.cartItemId !== itemId)
        }));
        try {
            await removeItemFromCart(userData.user.userId, itemId);
        } catch (error) {
            toast.error("Error in removing item from cart !!")
        }
    };

    //clear cart
    const clearCart = async() => {
        try {
            const result = await clearTheCart(userData.user.userId);
            setCart({ ...result });
        } catch (error) {
            toast.error("Error in clearing cart !!");
        }
    };

  return (
    <CartContext.Provider value={{cart, setCart, addItemCart, removeItemCart, clearCart}}>
        {children}
    </CartContext.Provider>
  )
};

export default CartProvider;