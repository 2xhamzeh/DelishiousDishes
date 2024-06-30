import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Dish = () => {
  const { dishId } = useParams();
  const [dish, setDish] = useState({
    name: "",
    img: "",
    time: 0,
    difficulty: "",
    Likes: 0,
    ingredients: [],
    instructions: [],
  });
  //fetch dish data from server
  useEffect(() => {
    const getDish = async () => {
      try {
        const response = await fetch(`/api/dishes/${dishId}`, {
          method: "GET",
        });
        const data = await response.json();
        setDish(data);
        //console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getDish();
  }, []);

  return (
    <div>
      <h1 className="text-center m-3 font-bold text-4xl">{dish.name}</h1>
      <img className="w-72 h-72 object-cover mx-auto border" src={dish.img} />
      <div className="flex gap-10 justify-center my-2 ">
        {dish.time && (
          <div className="flex flex-col justify-center items-center">
            <img className="w-11 h-11" src="/icons/clock.svg" />
            <span className="text-center">{dish.time} Min</span>
          </div>
        )}
        {dish.difficulty && (
          <div className="flex flex-col justify-center items-center">
            <img className="w-11 h-11" src="/icons/difficultyMeter.svg" />
            <span className="text-center">{dish.difficulty}</span>
          </div>
        )}
        <div className="flex flex-col justify-center items-center">
          <img className="w-11 h-11" src="/icons/heart.svg" />
          <span className="text-center">{dish.likes}</span>
        </div>
      </div>
      <div>
        <h3 className="text-center font-bold text-2xl bg-c4">Ingredients</h3>
        <ul className="text-center bg-c4">
          {dish.ingredients.map((ingredient, index) => (
            <li className="odd:bg-c1" key={index}>
              {ingredient}
            </li>
          ))}
          <li className="odd:bg-c1 even:bg-c4 text-transparent">.</li>
        </ul>
      </div>
      <div>
        <h3 className="text-center font-bold text-2xl bg-c3">Instructions</h3>
        <ol className="text-center">
          {dish.instructions.map((instruction, index) => (
            <li className="odd:bg-c2 even:bg-c3" key={index}>
              <span className=" block max-w-screen-sm mx-auto">
                {instruction}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Dish;
