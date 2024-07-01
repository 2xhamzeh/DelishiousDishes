import React, { useEffect, useState } from "react";

const EditDishImage = ({ dish, onImageSelect }) => {
  const [isEditImage, setIsEditImage] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setPreview(previewURL);
      onImageSelect(file); // Pass the selected image file back to the parent component
    }
  };

  return (
    <div>
      <label
        htmlFor="uploadDishImage"
        onMouseEnter={() => setIsEditImage(true)}
        onMouseLeave={() => setIsEditImage(false)}
        className="relative"
      >
        <div className="absolute inset-0 flex justify-center items-center">
          <img
            src="/icons/edit.svg"
            className={`h-12 w-12 z-10 ${isEditImage ? "" : "hidden"}`}
            alt="Edit Icon"
          />
        </div>
        <img
          src={preview || dish.img || "/images/placeholder.png"}
          className={`border object-cover rounded-full h-60 w-60 cursor-pointer ${
            isEditImage ? "brightness-75" : ""
          }`}
          alt="Dish"
        />
        <input
          id="uploadDishImage"
          type="file"
          name="image"
          className="hidden"
          onChange={handleImageChange}
        />
      </label>
    </div>
  );
};

export default EditDishImage;
