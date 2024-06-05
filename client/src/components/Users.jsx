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

  return <div>{JSON.stringify(users)}</div>;
};

export default Users;
