import { isServer } from "@tanstack/react-query";
import axios from "axios";

const myAxios = axios.create({});

myAxios.interceptors.request.use(async (config) => {
  return {
    baseURL: isServer ? process.env.BACKEND_API_HOST : "/api",
    ...config,
  };
});

export { myAxios };
