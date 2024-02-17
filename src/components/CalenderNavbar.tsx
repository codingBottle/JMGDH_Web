import React from "react";
import styled from "styled-components";
import theme from "@/theme/theme";

export default function CalenderNavbar() {
  return (
    <CalenderNavbarCss>
      <div>
        <button className="todaybtn">TODAY</button>
        <button className="arrowbtn">&lt;</button>
        <button className="arrowbtn">&gt;</button>
        <select>
          <option value="2021">2023년 10월</option>
          <option value="2022">2022</option>
        </select>
      </div>
      <div>
        <button className="onebtn">M</button>
        <button className="onebtn">Y</button>
        <button className="onebtn">N</button>
      </div>
    </CalenderNavbarCss>
  );
}

const CalenderNavbarCss = styled.div`
  width: 100%;
  height: 100%;
  padding: 0.875rem 1.25rem;
  margin: 0 auto;
  border: 0.0625rem solid ${theme.color.SecondaryColor.Border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    background-color: ${theme.color.PrimaryColor.PrimaryWhite};
    border: 0.0625rem solid ${theme.color.SecondaryColor.ButtonBorder};
    font-size: 1rem;
    font-weight: ${theme.fontWeight.Regular};
  }
  .todaybtn {
    height: 2.5rem;
    width: 5.375rem;
    margin-right: 0.9375rem;
  }
  .onebtn {
    height: 2.5rem;
    width: 2.5rem;
    margin-right: 15px;
  }
  .arrowbtn {
    height: 2.5rem;
    width: 2.5rem;
    margin-right: 5px;
  }
  select {
    height: 2.5rem;
    width: 149px;
    margin-left: 10px;
    font-size: 1rem;
    font-weight: ${theme.fontWeight.Regular};
    text-align: center;
  }
`;
