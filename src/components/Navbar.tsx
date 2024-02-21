import React, { useState } from "react";
import styled from "styled-components";
import theme from "@/theme/theme";
import { Menu, Home, Setting, Import } from "@/assets/icon/Navbaricon";
import LoginButton from "@/components/Login/LoginButton";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Navbar() {
  const [NavName, setNavName] = useState("인물의 캘린더");
  const router = useRouter();
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
  const goToHome = () => {
    router.push("/test"); // 홈으로 이동
  };
  return (
    <NavbarContainer>
      <div className="Lefts">
        <Menu />
        <img src="/favicon.ico" alt="logo" />
        <p>{NavName}</p>
      </div>
      <div className="Rights">
        <button className="user" onClick={peristalsis}>
          로그인 연동
        </button>
        <button className="user">SHARE</button>
        <button onClick={goToHome}>
          <Home />
        </button>
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
    img {
      width: 20px;
      height: 20px;
      margin-right: 20px;
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
      width: 40px;
      height: 40px;
      border-radius: 4px;
      margin-right: 20px;
      border: 1px solid ${theme.color.SecondaryColor.ButtonBorder};
      background-color: ${theme.color.PrimaryColor.PrimaryWhite};
      font-size: 12px;
      font-weight: ${theme.fontWeight.Regular};
      color: ${theme.color.SecondaryColor.BasicFont};
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .user {
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
