import React from "react";
import Header from "../components/Header";
import { Outlet, useRouteError } from "react-router-dom";
import Error from "../components/Error";
import { useNavigate } from "react-router-dom";
import useAuth from "../store/useAuth";
import { useEffect } from "react";

const Root = () => {
  const { authRedirect, isAuthenticated, login, logout, setAuthRedirect } =
    useAuth();
  const navigate = useNavigate();

  // this is used when refreshing the page to get the state of the authentication
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/users/isAuthenticated", {
          method: "GET",
        });
        if (response.status === 200) {
          const isAuthenticated =
            localStorage.getItem("isAuthenticated") === "true";
          if (isAuthenticated) {
            // token logic here
            login();
          } else {
            logout();
          }
        } else {
          logout();
        }
      } catch {
        console.log("error");
      }
    };
    checkAuth();
  }, []);

  // this navigate to login page when the session times out
  useEffect(() => {
    if (authRedirect) {
      navigate("/login");
      setAuthRedirect(false);
    }
  }, [authRedirect]);
  const error = useRouteError();

  return (
    <>
      <Header />
      {error ? <Error /> : <Outlet />}
    </>
  );
};

export default Root;
