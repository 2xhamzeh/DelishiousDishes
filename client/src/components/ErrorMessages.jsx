import React from "react";

const ErrorMessages = ({ messages }) => {
  return (
    <div className="flex flex-col items-center">
      {messages &&
        messages.map((message, index) => (
          <span key={index} className="text-red text-sm">
            {message}
          </span>
        ))}
    </div>
  );
};

export default ErrorMessages;
