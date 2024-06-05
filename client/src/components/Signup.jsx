import React, { useState } from "react";
import FormInput from "./FormInput";
import SubmitButton from "./SubmitButton";
import { Link } from "react-router-dom";

const Signup = () => {
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
        console.log(formData);
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
        console.log("called");
        console.log(response.status);
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
        <SubmitButton text="Sign Up" onClick={handleSubmit} />
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
