import React, { useEffect } from "react";
import styled from "styled-components";
import theme from "@/theme/theme";
import axios from "axios";

export default function Friendsure() {
  useEffect(() => {
    const handleInvite = async () => {
      const endpoint = "https://calendars2.duckdns.org/friends/requests";

      try {
        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        console.log("친구요청 목록 보기", response.data.data.requests);
      } catch (error) {
        console.error("친구 요청 목록 보기", error);
      }
    };
    handleInvite();
  }, []);

  return <MainComponent>Friendsure</MainComponent>;
}

const MainComponent = styled.div`
  width: 30%;
  height: 60%;
  position: absolute;
  top: 20%;
  left: 35%;
  background-color: white; // 오타 수정
`;
