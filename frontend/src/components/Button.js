import React from "react";

function Button({ onClick, children }) {
  return (
    <div className="relative flex items-center justify-center">
      <div
        onClick={onClick}
        style={{
          background: "#ff0c29",
          width: 250,
          height: 60,
          borderRadius: 10,
          fontSize: 16,
          fontWeight: 600,
          color: "white",
        }}
        className="z-10 flex items-center justify-center cursor-pointer select-none"
      >
        {children}
      </div>
      <div
        className="absolute"
        style={{
          width: "211.83px",
          height: 60,
          top: 16,
          background: "rgba(245, 56, 56, 0.35)",
          filter: "blur(10px)",
          borderRadius: 10,
        }}
      ></div>
    </div>
  );
}

export default Button;
