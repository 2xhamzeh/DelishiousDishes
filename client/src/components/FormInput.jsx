import React from "react";

const FormInput = ({ type, name, placeholder, value, onChange, iconSrc }) => {
  return (
    <div className=" border-black border drop-shadow bg-white flex h-10 items-center">
      <img src={iconSrc} className=" size-8 p-1" />
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onInput={(e) => {
          e.target.value = e.target.value.replace(/\s+/g, "");
        }}
        className="bg-white w-60 focus:outline-none"
      />
    </div>
  );
};

export default FormInput;
