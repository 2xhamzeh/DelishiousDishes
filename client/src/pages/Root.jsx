import React from "react";
import Header from "../components/Header";
import { Outlet, useRouteError } from "react-router-dom";
import Error from "../components/Error";

const Root = () => {
  const error = useRouteError();
  return (
    <>
      <Header />
      {error ? <Error /> : <Outlet />}
    </>
  );
};

export default Root;
