import axios from "axios";
import { useAuthStore } from "../zustand/useAuthStore";

const baseURL = "http://localhost:3415";

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 
    ) {
      useAuthStore.getState().logOut();
      window.location.href = "/login/";
      return Promise.reject(error);
    }

    // if (

    //   error.response.status === 401 &&
    //   !originalRequest._retry
    // ) {
    //   originalRequest._retry = true;
    //   const refreshToken = JSON.parse(localStorage.getItem("recipe")).refresh;

    //   return axiosInstance
    //     .post("/user/token/refresh/", {
    //       refresh: refreshToken,
    //     })
    //     .then((response) => {
    //       localStorage.setItem("recipe", JSON.stringify(response.data));

    //       axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${
    //         JSON.parse(localStorage.getItem("recipe")).access
    //       }`;

    //       originalRequest.headers["Authorization"] = `Bearer ${
    //         JSON.parse(localStorage.getItem("recipe")).access
    //       }`;

    //       return axiosInstance(originalRequest);
    //     });
    // }
    return Promise.reject(error);
  }
);

export default axiosInstance;
