import React, { useState } from "react";
import FormInput from "./FormInput";
import SubmitButton from "./SubmitButton";
import { Link } from "react-router-dom";

const Login = () => {
  // stores form state
  const [formData, setFormData] = useState({
    username: "",
    password: "",
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
    console.log(formData);
    // TODO:
    // - check if input is valid
    // submit using fetch POST
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
        <SubmitButton text="Log in" onClick={handleSubmit} />
        <span className="text-center font-light">
          No account yet?{" "}
          <Link to="/signup" className=" font-medium text-c4">
            Sign Up
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
