import React from "react";
import DishList from "./DishList";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const LikedDishList = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({
    username: "",
    liked: [],
  });

  useEffect(() => {
    const getLikedDishes = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`, {
          method: "GET",
        });
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    getLikedDishes();
  }, []);
  return (
    <div>
      <DishList title={`Liked by ${user.username}`} dishes={user.liked} />
    </div>
  );
};

export default LikedDishList;
