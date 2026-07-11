import { privateAxios } from "./AxiosService";

export const createReview = async (reviewData) => {

    const response = await privateAxios.post(
        "/reviews",
        reviewData
    );

    return response.data;
};

export const getReviewsOfProduct = async (productId) => {

    const response = await privateAxios.get(
        `/reviews/product/${productId}`
    );

    return response.data;
};