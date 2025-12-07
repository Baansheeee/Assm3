/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const Alert = ({ type = "error", message, onClose }) => {
  const typeStyles = {
    error: "bg-red-100 border-red-400 text-red-700",
    success: "bg-green-100 border-green-400 text-green-700",
    warning: "bg-yellow-100 border-yellow-400 text-yellow-700",
  };

  return (
    <div className={`border-l-4 p-2 rounded-md ${typeStyles[type]} mb-2`}>
      <div className="flex justify-between items-center">
        <span className="text-sm">{message}</span>
        {onClose && (
          <button onClick={onClose} className="text-xl font-semibold leading-none ml-4 focus:outline-none">
            &times;
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;
