import Swal from "sweetalert2";
import { API } from "../config/api";



export async function addProduct(data) {
  try {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const response = await API.post("/product", data, config);
    if (response && response.status > 200) {
        Swal.fire("Something Wrong!", "Add Product Failed");
      } else {
        Swal.fire("Good job!", "Add Product Success");
      }
  } catch (error) {
    Swal.fire("Something Wrong!", "Add Product Failed");
    throw new Error("Failed to posted data product ");
  }
}

