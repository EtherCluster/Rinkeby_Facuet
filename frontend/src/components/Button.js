import React from "react";

function Button({ onClick, children }) {
  return (
    <div>
      <div
        onClick={onClick}
        style={{
          background: "#F53838",
          width: 250,
          height: 60,
          borderRadius: 10,
          fontSize: 16,
          fontWeight: 600,
          color: "white",
        }}
        className="flex items-center justify-center cursor-pointer"
      >
        {children}
      </div>
    </div>
  );
}

export default Button;
