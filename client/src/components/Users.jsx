import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);

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
          <Link to={`/users/${user._id}`}>View Profile</Link>
        </div>
      ))}
    </div>
  );
};

export default Users;
