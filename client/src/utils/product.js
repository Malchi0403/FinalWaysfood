import { API } from "../config/api";

export async function getProductId(id) {
    try {
        const response = await API.get(`product-partner/${id}`)
        return response.data?.data;
        } catch (error) {
          throw new Error('Failed to fetch data');
    }
}

