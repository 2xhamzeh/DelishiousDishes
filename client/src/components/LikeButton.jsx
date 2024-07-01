import React, { useState, useEffect } from "react";
import useAuth from "../store/useAuth";

const LikeButton = ({ dishId, likedBy, likesCount }) => {
  const authUserId = useAuth((state) => state.authUserId);
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const [isLiked, setIsLiked] = useState(false);
  const [count, setCount] = useState(likesCount);

  useEffect(() => {
    setIsLiked(likedBy.includes(authUserId));
    setCount(likesCount);
  }, [likesCount, likedBy, authUserId]);

  const handleLikeToggle = async () => {
    const action = isLiked ? "unlike" : "like";
    const url = `/api/dishes/${dishId}/${action}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setIsLiked(!isLiked);
        setCount((prev) => (isLiked ? prev - 1 : prev + 1)); // Update count based on like/unlike
      } else {
        const errorData = await response.json();
        console.error("Failed to toggle like status:", errorData.message);
      }
    } catch (error) {
      console.error("Failed to toggle like status", error);
    }
  };

  return (
    <button
      onClick={isAuthenticated ? handleLikeToggle : undefined} // Only allow clicking if authenticated
      className="flex flex-col justify-center items-center"
    >
      <img
        className="w-11 h-11 cursor-pointer"
        src={isLiked ? "/icons/heartFull.svg" : "/icons/heart.svg"}
        alt="like button"
      />
      <span className="text-center">{count}</span>
    </button>
  );
};

export default LikeButton;
