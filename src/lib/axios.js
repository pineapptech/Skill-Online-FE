import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASEURL}/api`,
});

axiosInstance.interceptors.request.use((config) => {
  if (config.data?.email) {
    config.data.email = config.data.email.trim().toLowerCase();
  }
  return config;
});
