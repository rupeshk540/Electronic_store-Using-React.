import { privateAxios} from "./AxiosService";

//All the function calling api related to order

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

//get orders of users