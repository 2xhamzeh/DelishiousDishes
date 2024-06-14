import React, { useEffect, useState } from "react";

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
      <div>{JSON.stringify(dishes)}</div>

      {dishes?.map((dish) => (
        <div key={dish._id}>
          <p>Name: {dish.name}</p>
          <p>By: {dish.author}</p>
        </div>
      ))}
    </div>
  );
};

export default Dishes;
