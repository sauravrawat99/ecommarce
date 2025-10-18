import React from "react";

const ErrorMessage = ({ message }) => {
  return (
    <div className="flex justify-center items-center h-[60vh]">
      <p className="bg-red-100 text-red-700 px-4 py-2 rounded-md shadow">
        ❌ {message}
      </p>
    </div>
  );
};

export default ErrorMessage;
