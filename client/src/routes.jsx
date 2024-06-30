import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import Dishes from "./components/Dishes";
import Users from "./components/Users";
import Help from "./components/Help";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Dish from "./components/Dish";
import User from "./components/User";
import DishCreation from "./components/DishCreation";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Root />,
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
        path: "dishes/:dishId",
        element: <Dish />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "users/:userId",
        element: <User />,
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
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "createDish",
        element: <DishCreation />,
      },
    ],
  },
]);
