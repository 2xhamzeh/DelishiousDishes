import React, { useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import DishCreationIngredients from "./DishCreationIngredients";
import DishCreationInstructions from "./DishCreationInstructions";
import ErrorMessages from "./ErrorMessages";
import EditDishImage from "./EditDishImage";

const DishCreation = () => {
  const navigate = useNavigate();
  const [dish, setDish] = useState({
    name: "",
    time: "",
    difficulty: "Easy",
  });
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState([""]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [errorMessages, setErrorMessages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDish((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validate = (ingredients, instructions) => {
    let isValid = true;
    const errors = [];

    if (dish.name.trim() === "") {
      errors.push("Please add a name");
      isValid = false;
    }

    if (ingredients.length === 0) {
      errors.push("Please add ingredients");
      isValid = false;
    }

    if (instructions.length === 0) {
      errors.push("Please add instructions");
      isValid = false;
    }

    setErrorMessages(errors);
    return isValid;
  };

  const handleSubmit = async () => {
    const cleanedIngredients = ingredients.filter((str) => str.trim() !== "");
    const cleanedInstructions = instructions.filter((str) => str.trim() !== "");

    if (validate(cleanedIngredients, cleanedInstructions)) {
      try {
        const response = await fetch("/api/dishes/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: dish.name,
            time: dish.time,
            difficulty: dish.difficulty,
            ingredients: cleanedIngredients,
            instructions: cleanedInstructions,
          }),
        });

        if (response.status === 201) {
          const data = await response.json();

          // If dish is created successfully, upload the image
          if (selectedImage) {
            const formData = new FormData();
            formData.append("image", selectedImage);

            const imageResponse = await fetch(
              `/api/upload/dishImage/${data._id}`,
              {
                method: "POST",
                body: formData,
              }
            );

            if (!imageResponse.ok) {
              setErrorMessages(["Failed to upload image."]);
            }
          }

          navigate(`/dishes/${data._id}`);
        } else {
          setErrorMessages(["Failed to create dish"]);
        }
      } catch (error) {
        console.log(error);
        setErrorMessages(["An error occurred. Please try again later"]);
      }
    }
  };

  return (
    <div className="mb-10">
      <h1 className="text-center font-bold text-3xl mt-8 mb-10">
        Create a Dish
      </h1>
      <form
        action=""
        method="POST"
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col items-center gap-4"
      >
        <EditDishImage dish={dish} onImageSelect={setSelectedImage} />
        <div className="flex flex-col items-center">
          <label className="font-semibold text-lg" htmlFor="name">
            Name
          </label>
          <input
            className="p-1 w-72 text-center border focus:outline-none bg-white"
            type="text"
            name="name"
            id="name"
            placeholder="Name of dish"
            value={dish.name}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
          />
        </div>
        <div className="flex flex-col items-center">
          <label className="font-semibold text-lg" htmlFor="time">
            Time
          </label>
          <input
            className="p-1 w-72 text-center border focus:outline-none bg-white"
            type="text"
            name="time"
            id="time"
            placeholder="Time in minutes"
            value={dish.time}
            onChange={handleChange}
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, "");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
          />
        </div>
        <div className="flex flex-col items-center">
          <label className="font-semibold text-lg">Difficulty</label>
          <div className="flex gap-2 items-center">
            <label htmlFor="difficulty-easy">Easy</label>
            <input
              type="radio"
              id="difficulty-easy"
              name="difficulty"
              value="Easy"
              checked={dish.difficulty === "Easy"}
              onChange={handleChange}
            />
            <label htmlFor="difficulty-medium">Medium</label>
            <input
              type="radio"
              id="difficulty-medium"
              name="difficulty"
              value="Medium"
              checked={dish.difficulty === "Medium"}
              onChange={handleChange}
            />
            <label htmlFor="difficulty-hard">Hard</label>
            <input
              type="radio"
              id="difficulty-hard"
              name="difficulty"
              value="Hard"
              checked={dish.difficulty === "Hard"}
              onChange={handleChange}
            />
          </div>
        </div>
        <DishCreationIngredients
          ingredients={ingredients}
          setIngredients={setIngredients}
        />
        <DishCreationInstructions
          instructions={instructions}
          setInstructions={setInstructions}
        />
        <ErrorMessages messages={errorMessages} />
        <Button text="Create" onClick={handleSubmit}></Button>
      </form>
    </div>
  );
};

export default DishCreation;
