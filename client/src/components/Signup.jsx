import React, { useState } from "react";
import FormInput from "./FormInput";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessages from "./ErrorMessages";
import useAuth from "../store/useAuth";

const Signup = () => {
  const authStoreLogin = useAuth((state) => state.login);
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

  const [errorMessages, setErrorMessages] = useState([]);

  const validate = () => {
    const errors = [];
    let isValid = true;
    if (formData.username.trim() === "") {
      errors.push("Please enter a username");
      isValid = false;
    } else if (formData.username.length < 3) {
      errors.push("Username must be at least 3 characters long");
      isValid = false;
    }
    if (formData.password.trim() === "") {
      errors.push("Please enter a password");
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.push("Password must be at least 6 characters long");
      isValid = false;
    }
    if (formData.confirmPassword.trim() === "") {
      errors.push("Please confirm your password");
      isValid = false;
    }
    if (formData.password !== formData.confirmPassword) {
      errors.push("Passwords do not match");
      isValid = false;
    }
    setErrorMessages(errors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validate()) {
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
          if (response.status === 201) {
            // code to navigate to user profile
            const data = await response.json();

            try {
              const response = await fetch("/api/users/authenticate", {
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
                authStoreLogin(data.tokenExpiry, data.user.id);
              } else {
                setErrorMessages(["Something went wrong, please try again"]);
              }
            } catch (error) {
              console.log(error);
            }
          } else if (response.status === 409) {
            const data = await response.json();
            setErrorMessages([data.message]);
          } else {
            const data = await response.json();
            setErrorMessages([data.message]);
          }
        } catch (error) {
          console.log(error);
        }
      };
      register();
    }
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
        <ErrorMessages messages={errorMessages} />
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
