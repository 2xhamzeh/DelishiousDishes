import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import Dishes from "./components/Dishes";
import Users from "./components/Users";
import Help from "./components/Help";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Login from "./components/Login";
import Dish from "./components/Dish";
import User from "./components/User";
import DishCreation from "./components/DishCreation";
import LikedDishList from "./components/LikedDishList";
import CreatedDishList from "./components/CreatedDishList";
import EditProfile from "./components/EditProfile";

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
        path: "users/:userId/dishes",
        element: <CreatedDishList />,
      },
      {
        path: "users/:userId/liked",
        element: <LikedDishList />,
      },
      {
        path: "users/editProfile",
        element: <EditProfile />,
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
        path: "createDish",
        element: <DishCreation />,
      },
    ],
  },
]);
