import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../store/useAuth";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { Link } from "react-router-dom";

const Dish = () => {
  const navigate = useNavigate();
  const authUserId = useAuth((state) => state.authUserId);
  const { dishId } = useParams();
  const [dish, setDish] = useState({
    name: "",
    img: "",
    time: 0,
    difficulty: "",
    likes: 0,
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
      <img
        className="w-72 h-72 object-cover mx-auto border"
        src={dish.img || "/images/placeholder.png"}
      />
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
        {dish.author && (
          <Link
            to={`/users/${dish.author._id}`}
            className="flex flex-col justify-center items-center"
          >
            <img className="w-11 h-11" src="/icons/profile.svg" />
            <span className="text-center">{dish.author.username}</span>
          </Link>
        )}
      </div>
      <div>
        <h3 className="text-center font-bold text-2xl bg-c4">Ingredients</h3>
        <ul className="text-center bg-c4">
          {dish.ingredients.map((ingredient, index) => (
            <li className="odd:bg-c1" key={index}>
              {ingredient}
            </li>
          ))}
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
      {dish.author && authUserId && authUserId === dish.author.id && (
        <div className="flex justify-center gap-4 mt-4">
          <Button
            text={"Edit"}
            onClick={() => {
              navigate(`/dishes/${dishId}/edit`);
            }}
          />
          <button
            className={`bg-c3 border drop-shadow text-xl p-2 rounded-full w-40`}
            onClick={async () => {
              try {
                const response = await fetch(`/api/dishes/${dishId}`, {
                  method: "DELETE",
                });
                if (response.status === 200) {
                  navigate(`/users/${authUserId}`);
                } else {
                  console.log("Failed to delete dish");
                }
              } catch (error) {
                console.log(error);
              }
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Dish;
