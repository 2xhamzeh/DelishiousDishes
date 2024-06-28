import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { useEffect } from "react";
import useAuth from "./store/useAuth";

const App = () => {
  const { isAuthenticated, login, logout } = useAuth();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (isAuthenticated) {
      // token logic here
      login();
    } else {
      logout();
    }
    console.log("app rerendered");
  }, []);

  return <RouterProvider router={router} />;
};

export default App;
