import React from "react";
import UserProfileCard from "./UserProfileCard";
import { useParams } from "react-router-dom";
import DishProfileList from "./DishProfileList";

const User = () => {
  const { userId } = useParams();
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
        posts={user.postedDishes}
        likes={user.likes}
      />
      <div className="p-2">
        <DishProfileList name={"Dishes"} icon={"/icons/profile.svg"} />
        <DishProfileList name={"Liked"} icon={"/icons/profile.svg"} />
      </div>
    </div>
  );
};

export default User;
