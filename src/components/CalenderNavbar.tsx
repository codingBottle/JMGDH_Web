import React from "react";
import styled from "styled-components";
import theme from "@/styles/theme/theme";

export default function CalenderNavbar() {
  return (
    <CalenderNavbarCss>
      <div>
        <button>TODAY</button>
        <button>&lt;</button>
        <button>&gt;</button>
      </div>
      <div>
        <button>M</button>
        <button>Y</button>
        <button>N</button>
      </div>
    </CalenderNavbarCss>
  );
}

const CalenderNavbarCss = styled.div`
  width: 100%;
  height: 100%;
  padding: 14px 20px;
  margin: 0 auto;
  border: 1px solid ${theme.color.SecondaryColor.Border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
