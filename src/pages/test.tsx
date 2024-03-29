import React, { useEffect, useState } from "react";
import DailyCalender from "@/components/DailyCalender";
import styled from "styled-components";
import Navbar from "@/components/Navbar";
import CalenderNavbar from "@/components/CalenderNavbar";
import Todo from "@/components/Todo";
import WeeklyCalender from "@/components/WeeklyCalender";
import Right from "@/components/Modal/Right";
import axios from "axios";
import MonthCalender from "@/components/MonthCalender/MonthCalender";
import YearCalendar from "@/components/YearCalendar/";
import ShareCalendar from "@/components/ShareCalendar";

export default function Test() {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [displayedCalendar, setDisplayedCalendar] = useState("M");
  const [today, setToday] = useState(new Date());

  useEffect(() => {
    // accessToken 확인
    const storedAccessToken = localStorage.getItem("accessToken");
    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
    }

    // refreshToken 확인
    const storedRefreshToken = localStorage.getItem("refreshToken");
    if (storedRefreshToken) {
      setRefreshToken(storedRefreshToken);
    }
  }, []);

  const handleButtonClick = (buttonValue: any) => {
    setDisplayedCalendar(buttonValue);
  };
  const handleToDay = (today: any) => {
    setToday(new Date());
    console.log(new Date());
  };
  const handleDown = () => {
    setToday(
      new Date(today.getFullYear(), today.getMonth() - 1, today.getDate())
    );
    console.log(new Date());
  };
  const handleUP = () => {
    setToday(
      new Date(today.getFullYear(), today.getMonth() + 1, today.getDate())
    );
    console.log(new Date());
  };
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
            <CalenderNavbar
              onButtonClick={handleButtonClick}
              onToDay={handleToDay}
              onDown={handleDown}
              onUP={handleUP}
            />
          </div>

          {displayedCalendar === "M" && <MonthCalender today={today} />}
          {displayedCalendar === "W" && <WeeklyCalender />}
          {displayedCalendar === "Y" && <YearCalendar />}
          {displayedCalendar === "S" && <ShareCalendar />}
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
  height: 1300px;
  background-color:white;

`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  width: 80vw;
  height: calc(100vh - 80px);
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 20vw;
  height: 100%;
`;
const MiddleSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 80vw;
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
