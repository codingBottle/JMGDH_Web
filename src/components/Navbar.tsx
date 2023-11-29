import React, { useState } from "react";
import styled from "styled-components";
import theme from "@/styles/theme/theme";
import { Menu, Home, Setting, Import } from "@/assets/icon/Navbaricon";

export default function Navbar() {
  const [NavName, setNavName] = useState("인물의 캘린더");
  return (
    <NavbarContainer>
      <div className="Lefts">
        <Menu />
        <img src="/favicon.ico" alt="logo" />
        <p>{NavName}</p>
      </div>
      <div className="Rights">
        <button>SHARE</button>
        <Home />
        <Setting />
        <Import />
        <div className="name">
          <p>인물</p>
        </div>
      </div>
    </NavbarContainer>
  );
}

const NavbarContainer = styled.div`
  display: flex;  
  width: 100%;
  height: 80px;
  padding: 0 20px;
  border: 1px solid ${theme.color.SecondaryColor.ButtonBorder};
  background-color: ${theme.color.PrimaryColor.PrimaryWhite};
  align-items: center;
  justify-content: space-between;
  .Lefts {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    svg {
      margin-right: 10px;
    }
    img {
      width: 20px;
      height: 20px;
      margin-right: 20px;
    }
    p {
      font-size: 24px;
      font-weight: ${theme.fontWeight.Regular};
    }
  }

  .Rights {
  display: flex;
    flex-wrap: wrap;
    align-items: center;
    button {  
      width:74px;
      height: 38px;
      border-radius: 4px;
      margin-right: 20px;
      border: 1px solid ${theme.color.SecondaryColor.ButtonBorder};
      background-color: ${theme.color.PrimaryColor.PrimaryWhite};
      font-size: 12px;
      font-weight: ${theme.fontWeight.Regular};
  }
  svg {
    margin-right: 20px;
  }
  .name{
    border: 1px solid ${theme.color.SecondaryColor.ButtonBorder};
    border-radius: 50%;
    background-color: #9927F3;
    width: 26px;
    height: 26px;
 
    display: flex;
    justify-content: center;
    align-items: center;
    p{
    color: white;
    font-weight: ${theme.fontWeight.Regular};
    font-size: 8px;
    }
  }
}
`;
