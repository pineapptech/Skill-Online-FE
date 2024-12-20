import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
  baseURL: "https://api.etsapsfrica.com/api",
});
