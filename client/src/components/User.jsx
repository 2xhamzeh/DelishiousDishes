import React, { useEffect, useState } from "react";
import UserProfileCard from "./UserProfileCard";
import { useParams } from "react-router-dom";
import DishProfileList from "./DishProfileList";

const User = () => {
  const { userId } = useParams();
  const [userr, setUser] = useState({
    username: "",
    description: "",
    dishes: [],
    img: "",
    date: "00/00/0000",
    likes: 0,
    liked: [],
  });
  //fetch user data from server
  useEffect(() => {
    const getUser = async () => {
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
    getUser();
  }, []);

  // fake data for testing
  const user = {
    username: "Hamzeh",
    description:
      "Just an amateur cook Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam neque expedita velit temporibus magnam, fugiat molestias ea! Veritatis sint enim iure eligendi maxime. Nam eos, non iure veritatis dolor reiciendis.",
    dishes: [],
    img: "/images/placeholder.png",
    date: "11/11/2024",
    postedDishes: 22,
    likes: 42,
    liked: [],
  };

  return (
    <div className="flex items-start gap-5 p-5">
      <UserProfileCard
        username={user.username}
        img={user.img}
        description={user.description}
        date={user.date}
        posts={user.dishes.length}
        likes={user.likes}
      />
      <div className="p-2">
        {user.dishes && user.dishes.length > 0 && (
          <DishProfileList
            dishes={user.dishes}
            name={"Dishes"}
            icon={"/icons/profile.svg"}
          />
        )}
        {user.liked && user.liked.length > 0 && (
          <DishProfileList
            dishes={user.liked}
            name={"Liked"}
            icon={"/icons/profile.svg"}
          />
        )}
      </div>
    </div>
  );
};

export default User;
