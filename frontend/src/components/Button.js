import React from "react";
import styled from "styled-components";

function Button({ onClick, children }) {
  return (
    <div className="relative flex items-center justify-center">
      <Wrapper
        onClick={onClick}
        className="z-10 flex items-center justify-center transition-all cursor-pointer select-none"
      >
        {children}
      </Wrapper>
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

// hover: f5001d

const Wrapper = styled.button`
  background: #ff0c29;
  width: 250px;
  height: 60px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  color: white;
  :hover {
    background-color: #d3182c;
  }
  :active {
    background-color: #f5001d;
  }
`;
