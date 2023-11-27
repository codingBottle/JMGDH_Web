import React from "react";
import styled from "styled-components";

const RightArrow = ({ onClick }: { onClick?: () => void }) => {
  return (
    <svg
      width="18"
      height="16"
      viewBox="0 0 14 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path
        d="M1.75 7.56699L1 8L1.75 8.43301L12.25 14.4952L13 14.9282L13 14.0622L13 1.93782L13 1.0718L12.25 1.50481L1.75 7.56699Z"
        fill="#FAFAFA"
        stroke="#757575"
      />
    </svg>
  );
};

const LeftArrow = ({ onClick }: { onClick?: () => void }) => {
  return (
    <svg
      width="14"
      height="16"
      viewBox="0 0 14 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path
        d="M12.25 8.43301L13 8L12.25 7.56699L1.75 1.50481L1 1.0718L1 1.93782L0.999999 14.0622L0.999999 14.9282L1.75 14.4952L12.25 8.43301Z"
        fill="#FAFAFA"
        stroke="#757575"
      />
    </svg>
  );
};

export { RightArrow, LeftArrow };
