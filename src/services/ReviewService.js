import { privateAxios } from "./AxiosService";

export const createReview = async (reviewData) => {

    const response = await privateAxios.post(
        "/reviews",
        reviewData
    );

    return response.data;
};