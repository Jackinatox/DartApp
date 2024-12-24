import React from "react";

interface CustomButtonProp {
    onClick: () => void;
    text: string;
    color: string;
}


const CustomButton: React.FC<CustomButtonProp> = ({ onClick, color, text }) => {
    return (
      <button
        onClick={onClick}
        style={{
          backgroundColor: color,
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          padding: '10px 15px',
          cursor: 'pointer',
          fontSize: '16px',
        }}
      >
        {text}
      </button>
    );
  };
  
  export default CustomButton;