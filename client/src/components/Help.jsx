import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Help = () => {
  return (
    <div>
      <h1 className="text-center font-bold text-4xl m-10">Get in touch!</h1>
      <div className="flex flex-col gap-5 items-center">
        <p className="text-center w-1/3 text-xl">
          Have a question, comment or just want to say hello? We’d love to hear
          from you! Use our Email, and we’ll get back to you soon as soon as
          possible.
        </p>
        <span className="text-center font-medium text-xl">
          <a href="mailto:contact@delishiousdishes.com">
            contact@delishiousdishes.com
          </a>
        </span>
      </div>
    </div>
  );
};

export default Help;
