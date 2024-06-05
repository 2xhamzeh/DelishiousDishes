import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import Dishes from "./components/Dishes";
import Users from "./components/Users";
import Help from "./components/Help";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Login from "./components/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "dishes",
        element: <Dishes />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "help",
        element: <Help />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);
