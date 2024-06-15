import React from "react";
import { useNavigate } from "react-router-dom";

const DishCard = ({ id, name, img }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="m-8">
        <img
          className="border object-cover h-60 w-60 cursor-pointer"
          src={img || "/images/placeholder.png"}
          alt={name}
          onClick={() => navigate(`/dishes/${id}`)}
        />
        <h2 className="mt-5 text-center font-light text-lg">{name}</h2>
      </div>
    </div>
  );
};

export default DishCard;
