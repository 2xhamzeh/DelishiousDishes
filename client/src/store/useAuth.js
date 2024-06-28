import { create } from "zustand";

// Persist state to local storage
const useAuth = create((set) => ({
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
  login: () => {
    localStorage.setItem("isAuthenticated", "true");
    set({ isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem("isAuthenticated");
    set({ isAuthenticated: false });
  },
}));

export default useAuth;
