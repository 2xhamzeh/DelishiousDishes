import React, { useEffect, useState } from "react";

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
      <div>{JSON.stringify(users)}</div>

      {users?.map((user) => (
        <div key={user._id}>
          <p>Username: {user.username}</p>
          <p>Password: {user.password}</p>
          <p>Dish: {user.dish}</p>
        </div>
      ))}
    </div>
  );
};

export default Users;
