import React, { useEffect, useState } from "react";
import UserProfileCard from "./UserProfileCard";
import { useNavigate, useParams } from "react-router-dom";
import DishProfileList from "./DishProfileList";
import useAuth from "../store/useAuth";
import Button from "./Button";

const User = () => {
  const navigate = useNavigate();
  const authUserId = useAuth((state) => state.authUserId);
  const { userId } = useParams();
  const [user, setUser] = useState({
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
        //console.log(error);
      }
    };
    getUser();
  }, [userId]);

  return (
    <div className="flex items-start gap-5 p-5">
      <div className=" flex-shrink-0">
        <UserProfileCard
          username={user.username}
          img={user.img || "/images/placeholder.png"}
          description={user.description}
          date={user.date}
          posts={user.dishes.length}
          likes={user.likes}
        />
        {authUserId === userId && (
          <div className="flex justify-center">
            <Button
              onClick={() => navigate(`/users/editProfile`)}
              text={"Edit Profile"}
            />
          </div>
        )}
      </div>
      <div className="p-2">
        {user.dishes && user.dishes.length > 0 && (
          <DishProfileList
            dishes={user.dishes}
            name={"Dishes"}
            icon={"/icons/profile.svg"}
            userId={user._id}
            list={"dishes"}
          />
        )}
        {user.liked && user.liked.length > 0 && (
          <DishProfileList
            dishes={user.liked}
            name={"Liked"}
            icon={"/icons/profile.svg"}
            userId={user._id}
            list={"liked"}
          />
        )}
      </div>
    </div>
  );
};

export default User;
