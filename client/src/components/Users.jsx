import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";

const Users = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch("/api/users/", {
          method: "GET",
        });
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  return (
    <div>
      <h1 className="text-center font-bold text-3xl mt-8 mb-10">People</h1>
      <div className="flex flex-wrap justify-center">
        {users &&
          users.map((user) => {
            return (
              <UserCard
                key={user._id}
                id={user._id}
                username={user.username}
                imgSrc={user.img}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Users;
