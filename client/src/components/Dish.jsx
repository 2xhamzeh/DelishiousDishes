import React from "react";

const Dish = () => {
  // fake data for testing
  const dish = {
    name: "Fettuccine Alfredo",
    pic: "/images/fettuccine.jpg",
    time: 22,
    difficulty: "Easy",
    Likes: 33,
    ingredients: [
      "Fettuccine pasta - 1 pound",
      "Butter - 1/2 cup",
      "Heavy cream - 1 cup",
      "Garlic - 2 cloves, minced",
      "Parmesan cheese - 1 1/2 cups, freshly grated",
      "Salt - to taste",
      "Black pepper - 1/2 teaspoon, freshly ground",
    ],
    instructions: [
      "Bring a large pot of salted water to a boil. Add fettuccine pasta and cook according to package instructions until al dente.",
      "While the pasta is cooking, melt the butter in a large skillet over medium heat. Add the minced garlic and sauté until fragrant, about 1 minute.",
      "Pour the heavy cream into the skillet with the butter and garlic. Bring to a simmer, then reduce the heat and continue to simmer gently for about 5 minutes, stirring occasionally, until the cream thickens slightly.",
      "Drain the cooked fettuccine, reserving some of the pasta water. Add the drained fettuccine to the skillet with the cream sauce.",
      "Add the grated Parmesan cheese to the skillet. Toss everything together to coat the pasta in the sauce. If the sauce is too thick, add a little reserved pasta water to reach your desired consistency.",
      "Season with salt and freshly ground black pepper to taste. Serve immediately, optionally garnished with more grated Parmesan and a sprinkle of fresh parsley.",
    ],
  };
  return (
    <div>
      <h1 className="text-center m-3 font-bold text-4xl">{dish.name}</h1>
      <img className="w-72 h-72 object-cover mx-auto border" src={dish.pic} />
      <div className="flex gap-10 justify-center my-2 ">
        <div className="flex flex-col justify-center">
          <img className="w-11 h-11" src="/icons/clock.svg" />
          <span className="text-center">{dish.time} Min</span>
        </div>
        <div className="flex flex-col justify-center">
          <img className="w-11 h-11" src="/icons/difficultyMeter.svg" />
          <span className="text-center">{dish.difficulty}</span>
        </div>
        <div className="flex flex-col justify-center">
          <img className="w-11 h-11" src="/icons/heart.svg" />
          <span className="text-center">{dish.Likes}</span>
        </div>
      </div>
      <div>
        <h3 className="text-center font-bold text-2xl bg-c4">Ingredients</h3>
        <ul className="text-center bg-c4 pb-5 mb-5">
          {dish.ingredients.map((ingredient, index) => (
            <li className="odd:bg-c1" key={index}>
              {ingredient}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-center font-bold text-2xl bg-c3">Instructions</h3>
        <ol className="text-center">
          {dish.instructions.map((instruction, index) => (
            <li className="odd:bg-c2 even:bg-c3" key={index}>
              <span className=" block max-w-screen-sm mx-auto">
                {instruction}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Dish;
