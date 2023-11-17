import React from "react";
import styled from "styled-components";
import theme from "@/styles/theme/theme";

export default function Navbar() {
  return (
    <NavbarContainer>
      <div className="Left">안녕</div>
      <div className="Right">
        <p>하세요</p>
      </div>
    </NavbarContainer>
  );
}

const NavbarContainer = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: flex-start;  
  align-items: center;
  padding: 0px 20px;
  background-color: ${theme.color.PrimaryColor.PrimaryWhite}};
  border: 1px solid ${theme.color.SecondaryColor.ButtonBorder};
  .Left{
    display: flex;
    width: 50%;
    margin-left: auto;
    font-size: 20px;
    font-weight: ${theme.fontWeight.bold};
  }
  .Right{
    display: flex;
    width: 50%;
    p{
    margin-left: auto;
    font-size: 20px;
    font-weight: ${theme.fontWeight.bold};}
  }
`;
