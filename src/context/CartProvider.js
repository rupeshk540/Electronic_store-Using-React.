import React, { useContext, useEffect, useState } from 'react'
import CartContext from './CartContext';
import UserContext from "./UserContext";
import { addItemToCart, clearCart, getCart, removeItemFromCart } from '../services/CartService';
import { toast } from 'react-toastify';
import { Alert } from 'react-bootstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const CartProvider = ({children}) => {
    const {isLogin, userData} = useContext(UserContext);
    const [cart, setCart] = useState(null);
    


    //load user cart initially
    const loadUserCart = async (userId) => {
        try {
            const cart = await getCart(userId);
            setCart({...cart});
        } catch (error) {
           setCart({items:[]})
        }
    };

    useEffect(() => {
        if(isLogin){
            loadUserCart(userData.user.userId);
        }else{
            setCart(null);
        }
    },[isLogin]);

    //add item to cart
    const addItem = async(quantity, productId, next) => {
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
    const removeItem = async (itemId) => {
        try {
            const result = await removeItemFromCart(userData.user.userId, itemId);
            const newCartItems = cart.items.filter((item) => item.cartItemId !== itemId);
            setCart({
                ...cart,
                items: newCartItems,
            })
        } catch (error) {
            toast.error("Error in removing item from cart !!")
        }
    };

    //clear cart
    const clear = async() => {
        try {
            const result = await clearCart(userData.user.userId);
            setCart({
                ...cart,
                items: []
            })
        } catch (error) {
            toast.error("Error in clearing cart !!");
        }
    };

  return (
    <CartContext.Provider value={{cart, setCart, addItem, removeItem, clearCart: clear}}>
        {children}
    </CartContext.Provider>
  )
};

export default CartProvider;