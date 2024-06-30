import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DishList from "./DishList";

const CreatedDishList = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({
    username: "",
  });

  useEffect(() => {
    const getCreatedDishes = async () => {
      try {
        // TODO: make new endpoint to only get created dishes by this user, same for other components
        const response = await fetch(`/api/users/${userId}`, {
          method: "GET",
        });
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    getCreatedDishes();
  }, []);
  return (
    <div>
      <DishList title={`Created by ${user.username}`} dishes={user.dishes} />
    </div>
  );
};

export default CreatedDishList;
