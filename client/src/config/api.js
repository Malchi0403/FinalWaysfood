import axios from "axios";

// Create base URL API
export const API = axios.create({
  baseURL: "https://waysfood-production-f83d.up.railway.app/api/v1/",
});

export const APILOC = axios.create({
  baseURL: "https://nominatim.openstreetmap.org"
})


// Set Authorization Token Header
export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};

