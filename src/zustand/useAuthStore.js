import { create } from "zustand";
import axiosInstance from "../utils/axios";
import { recipes } from "../utils/dummyData.js";
import { persist } from "zustand/middleware";
import { log } from "@craco/craco/lib/logger.js";
export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      logIn: () => {
        set({ logged_in: true });
      },
      logOut: () => {
        set({ logged_in: false });
      },
      logged_in: false,
    }),
    {
      name: "user",
    }
  )
);
