import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "./Button";
import DishCreationIngredients from "./DishCreationIngredients";
import DishCreationInstructions from "./DishCreationInstructions";
import ErrorMessages from "./ErrorMessages";

const EditDish = () => {
  const navigate = useNavigate();
  const { dishId } = useParams();
  const [dish, setDish] = useState({
    name: "",
    time: "",
    difficulty: "Easy",
  });
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState([""]);
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    const fetchDish = async () => {
      try {
        const response = await fetch(`/api/dishes/${dishId}`);
        const data = await response.json();
        setDish({
          name: data.name || "",
          time: data.time || "",
          difficulty: data.difficulty || "Easy",
        });
        setIngredients(data.ingredients || [""]);
        setInstructions(data.instructions || [""]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDish();
  }, [dishId]);

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

  const handleSubmit = () => {
    const cleanedIngredients = ingredients.filter((str) => str.trim() !== "");
    const cleanedInstructions = instructions.filter((str) => str.trim() !== "");

    if (validate(cleanedIngredients, cleanedInstructions)) {
      const updateDish = async () => {
        try {
          const response = await fetch(`/api/dishes/${dishId}`, {
            method: "PUT",
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

          if (response.status === 200) {
            const data = await response.json();
            navigate(`/dishes/${data._id}`);
          } else {
            console.log("Failed to update dish");
          }
        } catch (error) {
          console.log(error);
        }
      };

      updateDish();
    }
  };

  return (
    <div className="mb-10">
      <h1 className="text-center font-bold text-3xl mt-8 mb-10">Edit Dish</h1>
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
            value={dish.name || ""}
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
            value={dish.time || ""}
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
        <Button text="Update" onClick={handleSubmit}></Button>
      </form>
    </div>
  );
};

export default EditDish;
