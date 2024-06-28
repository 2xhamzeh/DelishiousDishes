import { create } from "zustand";

// Persist state to local storage
const useAuth = create((set) => ({
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
  login: () => {
    localStorage.setItem("isAuthenticated", "true");
    set({ isAuthenticated: true });
  },
  logout: async () => {
    try {
      const response = await fetch("/api/users/logout", {
        method: "POST",
        //credentials: "include", // Ensure cookies are included
      });

      if (response.ok) {
        localStorage.removeItem("isAuthenticated");
        set({ isAuthenticated: false });
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  },
}));

export default useAuth;
