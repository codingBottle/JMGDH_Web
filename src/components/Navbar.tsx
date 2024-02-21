import React, { useState } from "react";
import styled from "styled-components";
import theme from "@/theme/theme";
import { Menu, Home, Setting, Import } from "@/assets/icon/Navbaricon";
import LoginButton from "@/components/Login/LoginButton";
import axios from "axios";
import Image from "next/image";

export default function Navbar() {
  const [NavName, setNavName] = useState("인물의 캘린더");

  const peristalsis = () => {
    axios
      .get(`https://calendars2.duckdns.org/google/authorize`)
      .then((response) => {
        window.location.href = response.data;
        console.log("구글 연동 성공", response.data);
      })
      .catch((error) => {
        console.error("구글 로그인 연동 오류:", error);
      });
  };

  return (
    <NavbarContainer>
      <div className="Lefts">
        <Menu />
        <Image
          src="/favicon.png"
          alt="logo"
          width={40}
          height={40}
          style={{ marginLeft: "20px" }}
        />
        <p>{NavName}</p>
      </div>
      <div className="Rights">
        <button onClick={peristalsis}>로그인 연동</button> {/* 수정 */}
        <button>SHARE</button>
        <Home />
        <Setting />
        <Import />
        <LoginButton />
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
      margin-right: 15x;
    }

    p {
      font-size: 24px;
      font-weight: ${theme.fontWeight.Regular};
      color: ${theme.color.SecondaryColor.BasicFont};
    }
  }

  .Rights {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    button {
      width: 74px;
      height: 38px;
      /* padding: 10px 18px; */
      border-radius: 4px;
      margin-right: 20px;
      border: 1px solid ${theme.color.SecondaryColor.ButtonBorder};
      background-color: ${theme.color.PrimaryColor.PrimaryWhite};
      font-size: 12px;
      font-weight: ${theme.fontWeight.Regular};
      color: ${theme.color.SecondaryColor.BasicFont};
    }
    svg {
      margin-right: 20px;
    }
  }
`;
