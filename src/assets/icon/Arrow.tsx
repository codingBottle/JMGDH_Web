import React from "react";
import styled from "styled-components";

const RightArrow = () => {
  return (
    <svg
      width="15"
      height="18"
      viewBox="0 0 15 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.5 16.9445L0.998136 9.12971L14.5 1.31497L14.5 16.9445Z"
        fill="white"
        stroke="#DBDBDB"
      />
    </svg>
  );
};

const LeftArrow = () => {
  return (
    <svg
      width="15"
      height="18"
      viewBox="0 0 15 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.5 1.31493L14.0019 9.12967L0.499999 16.9444L0.5 1.31493Z"
        fill="white"
        stroke="#DBDBDB"
      />
    </svg>
  );
};

export { RightArrow, LeftArrow };
