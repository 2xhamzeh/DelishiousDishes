import React from "react";

const SubmitButton = ({ text, onClick }) => {
  return (
    <button
      className={`bg-c4 border drop-shadow text-xl p-2 rounded-full w-40`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default SubmitButton;
