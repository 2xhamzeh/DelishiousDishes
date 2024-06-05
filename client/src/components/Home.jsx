import React from "react";
import { Link } from "react-router-dom";

const HomeBody = () => {
  return (
    <div>
      <div className="text-center mt-20 mb-10">
        <h1 className="font-bold text-4xl">Welcome to Delishious Dishes!</h1>
        <h2 className="text-3xl font-light mt-2">
          The perfect place to find and share recipes
        </h2>
      </div>
      <div className="flex flex-auto justify-evenly px-20 font-medium text-lg text-center">
        <Link to="/dishes">
          <h3>Dishes</h3>
          <img
            src="/images/dish.jpg"
            alt="image"
            className=" w-80 h-80 object-cover border"
          />
        </Link>
        <Link to="/users">
          <h3>People</h3>
          <img
            src="/images/people.jpg"
            alt="image"
            className=" w-80 h-80 object-cover border"
          />
        </Link>
        <Link to="/help">
          <h3>Help</h3>
          <img
            src="/images/recipeBook.jpg"
            alt="image"
            className=" w-80 h-80 object-cover border"
          />
        </Link>
      </div>
    </div>
  );
};

export default HomeBody;
