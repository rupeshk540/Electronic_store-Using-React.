import { publicAxios } from "./AxiosService";

export const sendMessageToAI = async (message) => {
    const response = await publicAxios.post("/ai/chat", {
        message
    });

    return response.data;
};