import React from "react";
import UserProfileCard from "./UserProfileCard";

const Profile = () => {
  const user = {
    username: "Hamzeh",
    description: "Just an amateur cook",
    dishes: [],
    img: "/images/placeholder.jpg",
    date: "11/11/2024",
    postedDishes: 22,
    likes: 42,
    liked: [],
  };
  return (
    <div>
      <UserProfileCard
        username={user.username}
        img={user.img}
        description={user.description}
        date={user.date}
        posts={user.postedDishes}
        likes={user.likes}
      />
    </div>
  );
};

export default Profile;
