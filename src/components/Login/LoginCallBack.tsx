// // components/LoginCallback.js
// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const LoginCallback = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleCallback = async () => {
//       try {
//         // OAuth 콜백에서 받은 인증 코드를 서버로 전송하여 액세스 토큰 및 리프레시 토큰 얻기
//         const response = await axios.post('oauth2/authorization/google/callback', {
//           code: new URLSearchParams(window.location.search).get('code'),
//         });

//         // 서버에서 전달한 토큰을 localStorage에 저장하거나, 상태 관리 라이브러리를 사용하여 상태를 업데이트
//         localStorage.setItem('accessToken', response.data.access_token);
//         localStorage.setItem('refreshToken', response.data.refresh_token);
//       } catch (error) {
//         console.error('OAuth 콜백 처리 중 에러:', error);
//       } finally {
//         // 로그인 처리 후 메인 페이지로 이동
//         navigate('/');
//       }
//     };

//     handleCallback();
//   }, [navigate]);

//   return (
//     <div>
//       로그인 처리 중...
//     </div>
//   );
// };

// export default LoginCallback;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // OAuth 콜백에서 받은 인증 코드 획득
        const authCode = new URLSearchParams(window.location.search).get(
          "code"
        );

        if (!authCode) {
          throw new Error("Authorization code not found.");
        }

        // 서버로 인증 코드 전송하여 토큰 획득
        const response = await axios.post(
          "oauth2/authorization/google/callback",
          { code: authCode }
        );

        // 서버에서 전달한 토큰 출력
        console.log("Access Token:", response.data.access_token);
        console.log("Refresh Token:", response.data.refresh_token);

        // 토큰을 안전한 방식으로 저장
        saveTokensLocally(
          response.data.access_token,
          response.data.refresh_token
        );
      } catch (error: any) {
        // 에러 처리 및 사용자에게 메시지 표시
        console.error("Error during OAuth callback processing:", error.message);
        alert("로그인 중에 오류가 발생했습니다.");
      } finally {
        // 로그인 처리 후 메인 페이지로 이동
        navigate("/");
      }
    };

    // 토큰을 안전한 방식으로 저장하는 함수
    const saveTokensLocally = (accessToken: string, refreshToken: string) => {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    };

    // OAuth 콜백 처리 함수 호출
    handleCallback();
  }, [navigate]);

  return <div>로그인 중...</div>;
};

export default LoginCallback;
