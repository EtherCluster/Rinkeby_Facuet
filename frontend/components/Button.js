import { Spinner } from "@chakra-ui/spinner";
import React from "react";
import styled from "styled-components";

function Button({ onClick, children, isLoading = false, secondary = false }) {
  return (
    <div className="relative flex items-center justify-center">
      <Wrapper
        onClick={onClick}
        className={`z-10 flex items-center justify-center transition-all cursor-pointer select-none ${
          secondary ? "isSecondary" : ""
        }`}
      >
        {isLoading && <Spinner />}
        {!isLoading && <>{children}</>}
      </Wrapper>
      <div
        className="absolute"
        style={{
          width: "211.83px",
          height: 60,
          top: 16,
          background: secondary ? "white" : "rgba(245, 56, 56, 0.25)",
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
  width: 250px;
  height: 60px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  color: white;
  border-width: 1px;
  border-color: #ff0c29;
  background: #ff0c29;
  color: white;
  &.isSecondary {
    background: white;
    color: #ff0c29;
  }
  :hover {
    background-color: #d3182c;
  }
  &.isSecondary:hover {
    background: #ff0c2911;
    color: #ff0c29;
  }
  :active {
    background-color: #f5001d;
    transform: translateY(2px);
  }
  &.isSecondary:active {
    background-color: #f5001d33;
  }
`;
