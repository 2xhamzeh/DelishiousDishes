import React from "react";
import { useNavigate } from "react-router-dom";

const UserCard = ({ id, username, img }) => {
  const navigate = useNavigate();
  return (
    <div className="m-8">
      <img
        className="border object-cover rounded-full h-60 w-60 cursor-pointer"
        src={img || "/images/placeholder.png"}
        alt={username}
        onClick={() => navigate(`/users/${id}`)}
      />
      <h2 className="mt-5 text-center font-light text-lg">{username}</h2>
    </div>
  );
};

export default UserCard;
