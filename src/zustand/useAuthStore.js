import { create } from "zustand";
import axiosInstance from "../utils/axios";
import { persist } from "zustand/middleware";
import { toastSuccess, toastError } from "../components/layouts/MessageToasts.js";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: "",
      logIn: async (email, password) => {
        try {
          const response = await axiosInstance.post("/auth/authLogin/", { email, password });
          const { token, user } = response.data.data;
          set({ logged_in: true, token, user });
          axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          toastSuccess("Login successful");
        } catch (error) {
          console.error("Login failed:", error);
          toastError("Login failed");
        }
      },
      signUp: async (email, password, first_name, last_name) => {
        try {
          const response = await axiosInstance.post("/auth/authSignUp/", { email, password, first_name, last_name });
          const { token, user } = response.data.data;
          set({ logged_in: true, token, user });
          axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          toastSuccess("Registration successful");
        } catch (error) {
          console.error("Register failed:", error);
          toastError("Registration failed");
        }
      },
      logOut: () => {
        set({ logged_in: false, token: "" });
        delete axiosInstance.defaults.headers.common["Authorization"];
        toastSuccess("Logged out successfully");
      },
      updateUser: async (formdata) => {
        try {
          const response = await axiosInstance.patch("/auth/user/", formdata);
          const user = {...response.data.data.updatedUser};
          
          set({ user });
          toastSuccess("Profile updated successfully");
        } catch (error) {
          console.error("Update profile failed:", error);
          toastError("Profile update failed");
        }
      },
      changePassword: async (oPassword, nPassword) => {
        try {
          const response = await axiosInstance.patch("/auth/user/changePassword", { oPassword, nPassword });
          const { token } = response.data.data;
          set({ token });
          axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          toastSuccess("Password changed successfully");
        } catch (error) {
          console.error("Change password failed:", error);
          toastError("Password change failed");
        }
      },
      logged_in: false,
    }),
    {
      name: "user",
    }
  )
);

axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${useAuthStore.getState().token}`;
