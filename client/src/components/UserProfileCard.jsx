import React from "react";

const UserProfileCard = ({
  username,
  img,
  description,
  date,
  posts,
  likes,
}) => {
  return (
    <div className="flex flex-col flex-shrink-0 p-5 justify-center items-center gap-2">
      <img className="w-64 h-64 border rounded-full" src={img} />
      <h1 className=" font-bold text-2xl">{username}</h1>
      <p className="max-w-60 text-center text-sm break-words">{description}</p>
      <div className="flex flex-col items-center">
        <span className="font-light">Member since:</span>
        <span>{date}</span>
      </div>
      <div>
        <span className="font-light">Posts: </span>
        <span>{posts}</span>
      </div>
      <div>
        <span className="font-light">Likes: </span>
        <span>{likes}</span>
      </div>
    </div>
  );
};

export default UserProfileCard;
