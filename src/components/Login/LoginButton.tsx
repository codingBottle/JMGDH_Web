// LoginButton.js
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import theme from "@/theme/theme";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";

const LoginButton = () => {
  const [img, Setimg] = useState("");
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
    const oneTimeUseCode = router.query.oneTimeUseCode;

    if (localStorage.getItem("accessToken")) {
      if (localStorage.getItem("refreshToken")) {
        SetloginSuccess(true);
      }
    }
  }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      const endpoint = `https://calendars2.duckdns.org/members`;

      try {
        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        Setimg(response.data.imageUrl);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("imge", response.data.imageUrl);
        localStorage.setItem("nickname", response.data.nickname);
      } catch (error) {
        console.error("월별 캘린더 오류:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {loginSuccess === false && (
        <LoginBtnWrapper href="https://calendars2.duckdns.org/oauth2/authorization/google">
          <p>로그인</p>
        </LoginBtnWrapper>
      )}
      {loginSuccess === true && (
        <LoginBtnWrapper
          onClick={logout}
          style={{
            width: 30,
            height: 30,
            borderRadius: 30,
            overflow: "hidden",
          }}>
          <Image src={img} width={30} height={30} alt="Profile Image" />
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
