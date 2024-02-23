import React, { useState, useEffect } from "react";
import styled from "styled-components";
import theme from "@/theme/theme";
import { Menu, Home, Setting, Import } from "@/assets/icon/Navbaricon";
import LoginButton from "@/components/Login/LoginButton";
import axios from "axios";
import Image from "next/image";
import Google from "./Login/google";

import { useRouter } from "next/router";

export default function Navbar() {
  const [NavName, setNavName] = useState<any>("미로그인");

  useEffect(() => {
    if (localStorage.getItem("nickname") !== null) {
      const name = localStorage.getItem("nickname");
      setNavName(name);
    }
  }, []); // 빈 배열을 전달하여 최초 렌더링 시에만 실행되도록 함

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
        <Image
          src="/favicon.png"
          alt="logo"
          width={40}
          height={40}
          style={{ marginLeft: "20px" }}
        />
        <p>{NavName}의 캘린더</p>  
        <Google/>
      </div>
      <div className="Rights">
        <button className="user" onClick={peristalsis}>
          캘린더 연동
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
      border: none;
      background-color: transparent;
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
