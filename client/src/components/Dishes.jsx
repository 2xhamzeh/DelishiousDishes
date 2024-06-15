import React, { useEffect, useState } from "react";
import DishCard from "./DishCard";

const Dishes = () => {
  const [dishes, setDishes] = useState();

  useEffect(() => {
    const getDishData = async () => {
      try {
        const response = await fetch("/api/dishes/", {
          method: "GET",
        });
        const data = await response.json();
        setDishes(data);
      } catch (error) {
        console.log(error);
      }
    };
    getDishData();
  }, []);

  return (
    <div>
      <h1 className="text-center font-bold text-3xl mt-8 mb-10">All Dishes</h1>
      <div className="flex flex-wrap justify-center">
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

export default Dishes;
