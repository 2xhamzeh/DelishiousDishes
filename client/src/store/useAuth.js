import { create } from "zustand";

const useAuth = create((set, get) => ({
  authRedirect: false,
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
  tokenExpiry: localStorage.getItem("tokenExpiry"),
  logoutTimeoutId: null,
  authUserId: null,

  setAuthRedirect: (value) => {
    set({ authRedirect: value });
  },

  login: (expiryDate, id) => {
    if (id) {
      localStorage.setItem("authUserId", id);
      set({ authUserId: id });
    } else {
      id = localStorage.getItem("authUserId");
      if (id) {
        set({ authUserId: id });
      }
    }
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
        set({ authRedirect: true });
        get().logout();
      }, timeout);
      set({ logoutTimeoutId: timeoutId });
    }
  },

  logout: () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("tokenExpiry");
    localStorage.removeItem("authUserId");

    const timeoutId = get().logoutTimeoutId;
    if (timeoutId) {
      clearTimeout(timeoutId);
      set({ logoutTimeoutId: null });
    }

    set({ isAuthenticated: false, tokenExpiry: null });
    set({ authUserId: null });
  },
}));

export default useAuth;
