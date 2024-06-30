import React, { useState } from "react";
import DishCard from "./DishCard";

const DishList = ({ title, dishes }) => {
  return (
    <div>
      <h1 className="text-center font-bold text-3xl mt-8 mb-10">{title}</h1>
      <div className="mx-8 flex flex-wrap gap-8 justify-center">
        {dishes &&
          dishes.map((dish) => (
            <DishCard
              key={dish._id}
              id={dish._id}
              name={dish.name}
              img={dish.img}
            />
          ))}
      </div>
    </div>
  );
};

export default DishList;
