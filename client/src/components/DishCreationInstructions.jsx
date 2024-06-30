import React from "react";

const DishCreationInstructions = ({ instructions, setInstructions }) => {
  return (
    <div className="flex flex-col gap-2 items-center">
      <h3 className="font-semibold text-lg">Instructions</h3>
      {instructions &&
        instructions.map((instruction, index) => (
          <div key={index} className="flex items-center gap-2">
            <textarea
              className="p-1 w-72 text-center border focus:outline-none bg-white resize-none overflow-hidden"
              name={`instruction-${index}`}
              placeholder="Instruction"
              value={instruction}
              rows="2"
              onChange={(e) => {
                const newInstructions = [...instructions];
                newInstructions[index] = e.target.value;
                setInstructions(newInstructions);

                // Adjust height directly within onChange
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
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
                const newInstructions = [...instructions];
                newInstructions.splice(index, 1);
                setInstructions(newInstructions);
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
          setInstructions([...instructions, ""]);
        }}
      >
        Add
      </button>
    </div>
  );
};

export default DishCreationInstructions;
