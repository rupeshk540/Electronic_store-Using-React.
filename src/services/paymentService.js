
 import { privateAxios } from "./AxiosService";
  //payment related api calls
  
  //create order for payment
  export const makePayment = (orderId,amount) => {
  return privateAxios.post(`/payment/user/createOrder`,{orderId,amount});
};
