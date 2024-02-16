import React, { useEffect, useState } from "react";
import DailyCalender from "@/components/DailyCalender";
import styled from "styled-components";
import Navbar from "@/components/Navbar";
import CalenderNavbar from "@/components/CalenderNavbar";
import Todo from "@/components/Todo";
import WeeklyCalender from "@/components/WeeklyCalender";
import Right from "@/components/Modal/Right";

export default function hello() {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  useEffect(() => {
    // accessToken 확인
    const storedAccessToken = localStorage.getItem("accessToken");
    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
      console.log("accesstoken:", storedAccessToken);
    }

    // refreshToken 확인
    const storedRefreshToken = localStorage.getItem("refreshToken");
    if (storedRefreshToken) {
      setRefreshToken(storedRefreshToken);
      console.log("setRefreshToken:", storedRefreshToken);
    }
  }, []);

  return (
    <Wrapper>
      <Navbar />
      <Content>
        <LeftSection>
          <div className="daily">
            <DailyCalender />
          </div>
          <div className="todo">
            <Todo />
          </div>
        </LeftSection>
        <MiddleSection>
          <div className="calenderNav">
            <CalenderNavbar />
          </div>
          <WeeklyCalender />
        </MiddleSection>
        <RightSection>
          <Right />
        </RightSection>
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: calc(100vh - 80px);
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 266px;
  height: 100%;
`;
const MiddleSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .calenderNav {
    height: 68px;
    background-color: #999;
  }
`;
const RightSection = styled.div`
  width: 78px;
  height: 100%;
`;

const TodoContainer = styled.div`
  width: 266px;
  height: 598px;
`;
