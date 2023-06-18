import { API } from "../config/api";

export async function transaction(data) {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const transaction = await API.post("transaction", data, config);
    console.log("Post Success", transaction);
    return transaction?.data?.data;
  } catch (error) {
    throw new error("transaction error");
  }
}
