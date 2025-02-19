import React from 'react';
import clsx from 'clsx'; // Ensure clsx is installed and imported

const Button = ({ icon, className, label, type = "button", onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx("px-3 py-2 outline-none", className)} // clsx for conditional classes
    >
      {label && <span>{label}</span>}
      {icon && <span className="ml-2">{icon}</span>}
    </button>
  );
};

export default Button;
