import React from "react";
import DishCard from "./DishCard";
import Button from "./Button";

const DishProfileList = ({ dishes, name, icon }) => {
 
  return (
    <div className="">
      <div className="flex items-center my-1">
        <img className="w-7 h-7" src={icon} />
        <h1 className="text-xl font-medium">{name}</h1>
      </div>
      <div className="flex items-center gap-3 flex-wrap">
        {dishes &&
          dishes
            .slice(0, 3)
            .map((dish) => (
              <DishCard
                key={dish._id}
                id={dish._id}
                name={dish.name}
                img={dish.img}
              />
            ))}
        {dishes && dishes.length >= 4 && (
          <div className="m-2 bg-c3 w-60 h-60 flex justify-center items-center mb-12 border">
            <Button text={"More"} onClick={() => {}} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DishProfileList;
