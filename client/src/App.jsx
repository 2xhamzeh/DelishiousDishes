import React from "react";
import { RouterProvider, useNavigate } from "react-router-dom";
import { router } from "./routes";
import { useEffect } from "react";
import useAuth from "./store/useAuth";

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
