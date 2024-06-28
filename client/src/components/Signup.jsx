import React, { useState } from "react";
import FormInput from "./FormInput";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  // stores form state
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  // changes form state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // TODO:
    // - check if input is valid
    // submit using fetch POST
    const register = async () => {
      try {
        const response = await fetch("/api/users/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
          }),
        });
        if (response.status === 200) {
          // code to navigate to user profile
          const data = await response.json();
          navigate(`/users/${data.user.id}`);
        } else {
          // code to show error message
        }
      } catch (error) {
        console.log(error);
      }
    };
    register();
  };

  return (
    <div>
      <h1 className="font-bold text-4xl text-center mt-24 mb-14">
        Delishious Dishes!
      </h1>
      <form
        action=""
        method="POST"
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-auto flex-col gap-8 items-center"
      >
        <FormInput
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          iconSrc="/icons/person.svg"
        />
        <FormInput
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          iconSrc="/icons/lock.svg"
        />
        <FormInput
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          iconSrc="/icons/lock.svg"
        />
        <Button text="Sign Up" onClick={handleSubmit} />
        <span className="text-center font-light">
          Already a member?{" "}
          <Link to="/login" className=" font-medium text-c4">
            Log In
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;
