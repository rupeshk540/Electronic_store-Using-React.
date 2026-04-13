import axios from "axios";
import { BASE_URL } from "./HelperService";

export const getAdminStats = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/stats`);
    return response.data;
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    throw error;
  }
};
