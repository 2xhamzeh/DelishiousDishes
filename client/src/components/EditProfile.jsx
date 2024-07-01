import React, { useEffect, useState } from "react";
import useAuth from "../store/useAuth";
import Button from "./Button"; // Assuming Button is a common component
import ErrorMessages from "./ErrorMessages"; // Assuming ErrorMessages is a common component
import { useNavigate } from "react-router-dom";
import EditUserImage from "./EditUserImage";

const EditProfile = () => {
  const navigate = useNavigate();
  const authUserId = useAuth((state) => state.authUserId);
  const [user, setUser] = useState({
    username: "",
    description: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    if (authUserId) {
      const getUser = async () => {
        try {
          const response = await fetch(`/api/users/${authUserId}`, {
            method: "GET",
          });
          const data = await response.json();
          setUser(data);
        } catch (error) {
          console.log(error);
        }
      };
      getUser();
    }
  }, [authUserId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validate = () => {
    let isValid = true;
    const errors = [];

    if (user.username.trim() === "") {
      errors.push("Please add a name");
      isValid = false;
    } else if (user.username.length < 3) {
      errors.push("Username must be at least 3 characters long");
      isValid = false;
    }

    setErrorMessages(errors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (validate()) {
      try {
        // Update user details
        const response = await fetch(`/api/users/${authUserId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });

        if (response.status === 200) {
          // If user details updated successfully, upload the image
          if (selectedImage) {
            const formData = new FormData();
            formData.append("image", selectedImage);

            const imageResponse = await fetch(
              `/api/upload/userImage/${authUserId}`,
              {
                method: "POST",
                body: formData,
              }
            );

            if (!imageResponse.ok) {
              setErrorMessages(["Failed to upload image."]);
            }
          }

          navigate(`/users/${authUserId}`);
        } else if (response.status === 409) {
          setErrorMessages(["Username already taken"]);
        } else {
          setErrorMessages(["An error occurred. Please try again later"]);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="mb-10">
      <h1 className="text-center font-bold text-3xl mt-8 mb-10">
        Edit Profile
      </h1>

      <form
        action=""
        method="POST"
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col items-center gap-4"
      >
        <EditUserImage user={user} onImageSelect={setSelectedImage} />
        <div className="flex flex-col items-center">
          <label className="font-semibold text-lg" htmlFor="username">
            Username
          </label>
          <input
            className="p-1 w-72 text-center border focus:outline-none bg-white"
            type="text"
            name="username"
            id="username"
            placeholder="Your username"
            value={user.username}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
          />
        </div>
        <div className="flex flex-col items-center">
          <label className="font-semibold text-lg" htmlFor="description">
            Description
          </label>
          <textarea
            className="p-1 w-72 text-center border focus:outline-none bg-white resize-none"
            name="description"
            id="description"
            placeholder="Your description"
            value={user.description}
            onChange={handleChange}
            rows="3"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
          />
        </div>
        <ErrorMessages messages={errorMessages} />
        <Button text="Update" onClick={handleSubmit} />
      </form>
    </div>
  );
};

export default EditProfile;
