// LoginButton.js
import React from "react";
import styled from "styled-components";
import theme from "@/styles/theme/theme";
import { useEffect } from "react";
import { useRouter } from "next/router";

const LoginButton = () => {
  const router = useRouter();

  useEffect(() => {
    // URL에서 oneTimeUseCode를 가져옴
    const oneTimeUseCode = router.query.oneTimeUseCode;

    // oneTimeUseCode가 있을 경우
    if (oneTimeUseCode) {
      console.log('Received oneTimeUseCode:', oneTimeUseCode);

      // 여기서 백엔드로 oneTimeUseCode를 전달하고 Access token을 받아오는 로직을 구현
      // fetch 또는 axios 등을 사용하여 백엔드와 통신하는 코드 작성

      // 예시: 백엔드에 oneTimeUseCode 전송 및 Access token 받아오기
      // fetch('백엔드 엔드포인트', {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // })
      //   .then(response => response.json())
      //   .then(data => {
      //     const accessToken = data.accessToken;

      //     // Access token을 로컬 스토리지에 저장
      //     localStorage.setItem('accessToken', accessToken);

      //     // 메인 화면으로 리다이렉트
      //     router.push('/');
      //   })
      //   .catch(error => console.error('Error:', error));
    }
  }, [router.query.oneTimeUseCode]);

  return (
    <LoginBtnWrapper href="https://calendars2.duckdns.org/oauth2/authorization/google" target="_blank">
      <p>인물</p>
    </LoginBtnWrapper>
  );
};

const LoginBtnWrapper = styled.a`
  display: block;
  border: 1px solid ${theme.color.SecondaryColor.ButtonBorder};
  border-radius: 50%;
  background-color: #9927F3;
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
