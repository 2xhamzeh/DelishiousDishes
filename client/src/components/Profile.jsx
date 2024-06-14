import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${id}`, {
          method: "GET",
        });
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [id]);

  return (
    <div>
      {user ? (
        <div>
          <p>Username: {user.username}</p>
          <p>Dishes: {user.dishes.join(", ")}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
