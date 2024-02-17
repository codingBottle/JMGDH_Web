// LoginButton.js
import React, { useState } from "react";
import styled from "styled-components";
import theme from "@/theme/theme";
import { useEffect } from "react";
import { useRouter } from "next/router";

const LoginButton = () => {
  const router = useRouter();
  const [loginSuccess, SetloginSuccess] = useState(false);

  const logout = () => {
    const confirmLogout = window.confirm("로그아웃 하시겠습니까?");

    if (confirmLogout) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.reload();
    }
  };

  useEffect(() => {
    // URL에서 oneTimeUseCode를 가져옴
    const oneTimeUseCode = router.query.oneTimeUseCode;

    // accessToken이 있을 경우
    if (localStorage.getItem("accessToken")) {
      if (localStorage.getItem("refreshToken")) {
        console.log("로그인되었음");
        SetloginSuccess(true);
      }
    }
  }, []);

  return (
    <>
      {loginSuccess === false && (
        <LoginBtnWrapper
          href="https://calendars2.duckdns.org/oauth2/authorization/google"
          target="_blank"
        >
          <p>로그인</p>
        </LoginBtnWrapper>
      )}
      {loginSuccess === true && (
        <LoginBtnWrapper onClick={logout}>
          <p>현우</p>
        </LoginBtnWrapper>
      )}
    </>
  );
};

const LoginBtnWrapper = styled.a`
  display: block;
  border: 1px solid ${theme.color.SecondaryColor.ButtonBorder};
  border-radius: 50%;
  background-color: #9927f3;
  width: 26px;
  height: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    color: white;
    font-weight: ${theme.fontWeight.Regular};
    font-size: 8px;
  }
`;

export default LoginButton;
