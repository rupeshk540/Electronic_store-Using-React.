import { privateAxios} from "./AxiosService";

//All the function calling api related to order

//Create order & init payment (COD or Online)
export const createOrderAndInitPayment = async (orderData) => {
  try {
    const { data } = await privateAxios.post(`/orders`, orderData);
    console.log(orderData)
    return data; // PaymentInitResponse from backend
  } catch (error) {
    console.error("Error creating order:", error);
    throw error.response?.data || { message: "Order creation failed" };
  }
};

//Verify payment (Razorpay / Stripe / PayPal)
export const verifyPayment = async (verifyRequest) => {
  try {
    const { data } = await privateAxios.post(`orders/verify`, verifyRequest);
    return data;
  } catch (error) {
    console.error("Payment verification error:", error);
    throw error.response?.data || { message: "Verification failed" };
  }
};

//get orders of users
export const getOrdersOfUser = async (userId) => {
    const result = await privateAxios.get(`/orders/users/${userId}`);
    return result.data;
};

//get orderes
export const getAllOrders = async(pageNumber, pageSize, sortBy, sortDir) => {
    let result = await privateAxios.get(`/orders?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`);
    return result.data;
};

//update orders
export const updateOrder = async(order, orderId) => {
    const result = await privateAxios.put(`/orders/${orderId}`, order);
    return result.data;
};

//update order status
export const updateOrderStatusApi = async (orderId, status) => {

    const response = await privateAxios.put(
        `/orders/${orderId}/status`,
        { orderStatus: status }
    );

    return response.data;
};

//cancel order
export const cancelOrder = async (orderId) => {
   const response = await privateAxios.put(
      `/orders/cancel/${orderId}`
    );
  return response.data;
};


//request return service 
export const requestReturn = async(orderId) => {

   const response = await privateAxios.put(
      `/orders/return/${orderId}`
   );

   return response.data;
}
