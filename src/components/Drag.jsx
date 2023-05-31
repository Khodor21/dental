import React, { useState } from "react";

const DragAndDrop = () => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (event) => {
    setIsDragging(true);
    event.dataTransfer.setData("text/plain", event.target.id);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const draggableElementId = event.dataTransfer.getData("text/plain");
    const draggableElement = document.getElementById(draggableElementId);
    event.target.appendChild(draggableElement);
  };

  return (
    <div className="flex justify-center items-center h-screen cursor-pointer">
      <div
        id="drag-div"
        draggable="true"
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`p-4 bg-blue-500 text-white rounded ${
          isDragging ? "opacity-50" : ""
        }`}
      >
        <h5 className="text-main text-center">Drag Me!</h5>{" "}
      </div>
    </div>
  );
};

export default DragAndDrop;
