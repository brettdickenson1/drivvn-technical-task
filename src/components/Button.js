import React from "react";
import "./Button.css";

const Button = ({ onClick, disabled }) => {
  return (
    <button onClick={onClick} disabled={disabled} className="custom-button">
      Draw Card
    </button>
  );
};

export default Button;
