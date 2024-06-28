import { create } from "zustand";

const useAuth = create((set, get) => ({
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
  tokenExpiry: localStorage.getItem("tokenExpiry"),
  logoutTimeoutId: null,

  login: (expiryDate) => {
    if (expiryDate) {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("tokenExpiry", expiryDate);
      set({ isAuthenticated: true, tokenExpiry: expiryDate });
    } else {
      expiryDate = localStorage.getItem("tokenExpiry");
      if (expiryDate) {
        set({ isAuthenticated: true, tokenExpiry: expiryDate });
      }
    }

    const expiresAt = new Date(expiryDate).getTime();
    const currentTime = Date.now();
    const timeout = expiresAt - currentTime;

    if (timeout > 0) {
      const timeoutId = setTimeout(() => {
        get().logout();
      }, timeout);
      set({ logoutTimeoutId: timeoutId });
    }
  },

  logout: () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("tokenExpiry");

    const timeoutId = get().logoutTimeoutId;
    if (timeoutId) {
      clearTimeout(timeoutId);
      set({ logoutTimeoutId: null });
    }

    set({ isAuthenticated: false, tokenExpiry: null });
  },
}));

export default useAuth;
