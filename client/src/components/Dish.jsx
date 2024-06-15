import React from "react";

const Dish = () => {
  return (
    <div>
      <div className="flex justify-center">
        <div>
          <h1 className="font-bold text-3xl">Dish Name</h1>
          <h3 className="">Time: 22 Min</h3>
          <h3>Difficulty: Easy</h3>
          <h3>Likes: 104</h3>
          <div className="">
            <h3 className="font-bold text-xl">Ingredients:</h3>
            <ul className="list-disc ml-5">
              <li>Ingredient 1</li>
              <li>Ingredient 2</li>
              <li>Ingredient 3</li>
              <li>Ingredient 1</li>
              <li>Ingredient 2</li>
              <li>Ingredient 3</li>
              <li>Ingredient 1</li>
              <li>Ingredient 2</li>
              <li>Ingredient 3</li>
              <li>Ingredient 1</li>
              <li>Ingredient 2</li>
              <li>Ingredient 3</li>
              <li>Ingredient 1</li>
              <li>Ingredient 2</li>
              <li>Ingredient 3</li>
              <li>Ingredient 1</li>
              <li>Ingredient 2</li>
              <li>Ingredient 3</li>
            </ul>
          </div>
        </div>
        <div>
          <img
            className="w-96 h-96 object-cover"
            src="/images/dish.jpg"
            alt="Dish"
          />
        </div>
      </div>

      <div className=" flex flex-col items-center">
        <h3 className="font-bold text-xl text-center">Instructions:</h3>
        <ol className="list-decimal w-2/3 flex flex-col gap-5 items-center text-center">
          <li>
            Instruction 1 Lorem ipsum, dolor sit amet consectetur adipisicing
            elit. Blanditiis repellendus id voluptate possimus libero excepturi
            debitis esse corporis laboriosam iure quas quaerat veritatis maiores
            repudiandae reprehenderit, voluptatum tempore! Laudantium,
            architecto?
          </li>
          <li>
            Instruction 2 Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Veritatis incidunt natus quod itaque quisquam vero molestiae
            repellendus commodi odio illo. Nemo atque obcaecati eaque totam
            similique doloribus ullam magnam non.
          </li>
          <li>
            Instruction 3 Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Ipsa sint error optio perferendis voluptas quam in molestiae
            sed suscipit quo corrupti ab nobis veritatis neque, incidunt nihil
            impedit laboriosam iste!
          </li>
          <li>
            Instruction 1 Lorem ipsum, dolor sit amet consectetur adipisicing
            elit. Blanditiis repellendus id voluptate possimus libero excepturi
            debitis esse corporis laboriosam iure quas quaerat veritatis maiores
            repudiandae reprehenderit, voluptatum tempore! Laudantium,
            architecto?
          </li>
          <li>
            Instruction 2 Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Veritatis incidunt natus quod itaque quisquam vero molestiae
            repellendus commodi odio illo. Nemo atque obcaecati eaque totam
            similique doloribus ullam magnam non.
          </li>
          <li>
            Instruction 3 Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Ipsa sint error optio perferendis voluptas quam in molestiae
            sed suscipit quo corrupti ab nobis veritatis neque, incidunt nihil
            impedit laboriosam iste!
          </li>
          <li>
            Instruction 1 Lorem ipsum, dolor sit amet consectetur adipisicing
            elit. Blanditiis repellendus id voluptate possimus libero excepturi
            debitis esse corporis laboriosam iure quas quaerat veritatis maiores
            repudiandae reprehenderit, voluptatum tempore! Laudantium,
            architecto?
          </li>
          <li>
            Instruction 2 Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Veritatis incidunt natus quod itaque quisquam vero molestiae
            repellendus commodi odio illo. Nemo atque obcaecati eaque totam
            similique doloribus ullam magnam non.
          </li>
          <li>
            Instruction 3 Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Ipsa sint error optio perferendis voluptas quam in molestiae
            sed suscipit quo corrupti ab nobis veritatis neque, incidunt nihil
            impedit laboriosam iste!
          </li>
        </ol>
      </div>
    </div>
  );
};

export default Dish;
