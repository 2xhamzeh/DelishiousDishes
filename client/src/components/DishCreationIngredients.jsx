import React from "react";

const DishCreationIngredients = ({ ingredients, setIngredients }) => {
  return (
    <div className="flex flex-col gap-2 items-center">
      <h3 className="font-semibold text-lg">Ingredients</h3>
      {ingredients &&
        ingredients.map((ingredient, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              className="p-1 w-72 text-center border focus:outline-none bg-white"
              type="text"
              name={`ingredient-${index}`}
              placeholder="Ingredient"
              value={ingredient}
              onChange={(e) => {
                const newIngredients = [...ingredients];
                newIngredients[index] = e.target.value;
                setIngredients(newIngredients);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
            />
            <button
              className="px-2 border rounded-sm bg-c3"
              onClick={() => {
                const newIngredients = [...ingredients];
                newIngredients.splice(index, 1);
                setIngredients(newIngredients);
              }}
            >
              x
            </button>
          </div>
        ))}
      <button
        className="border py-0.5 px-4 bg-c3 rounded-sm"
        type="button"
        onClick={() => {
          setIngredients([...ingredients, ""]);
        }}
      >
        Add
      </button>
    </div>
  );
};

export default DishCreationIngredients;
