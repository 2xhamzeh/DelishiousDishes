import React, { useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import DishCreationIngredients from "./DishCreationIngredients";
import DishCreationInstructions from "./DishCreationInstructions";
import ErrorMessages from "./ErrorMessages";

const DishCreation = () => {
  const navigate = useNavigate();
  const [dish, setDish] = useState({
    name: "",
    time: "",
  });
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState([""]);

  const [errorMessages, setErrorMessages] = useState([]);

  // changes form state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDish((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validate = (ingredients, instructions) => {
    let isValid = true; // Start assuming the form is valid

    if (dish.name.trim() === "") {
      error.push;
      isValid = false; // Mark as invalid
    }

    if (ingredients.length === 0) {
      setErrorMessages((prevState) => [...prevState, "Please add ingredients"]);
      isValid = false; // Mark as invalid
    }

    if (instructions.length === 0) {
      setErrorMessages((prevState) => [
        ...prevState,
        "Please add instructions",
      ]);
      isValid = false; // Mark as invalid
    }

    return isValid; // Return the validation result
  };

  const handleSubmit = () => {
    // Remove empty ingredients and instructions
    const cleanedIngredients = ingredients.filter((str) => str.trim() !== "");
    const cleanedInstructions = instructions.filter((str) => str.trim() !== "");

    // Validate with the cleaned arrays
    if (validate(cleanedIngredients, cleanedInstructions)) {
      const createDish = async () => {
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
            navigate(`/dishes/${data._id}`);
          } else {
            console.log("Failed to createDish");
          }
        } catch (error) {
          console.log(error);
        }
      };
      createDish();
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
        <Button text="create" onClick={handleSubmit}></Button>
      </form>
    </div>
  );
};

export default DishCreation;
