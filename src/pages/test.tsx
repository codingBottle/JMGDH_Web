import React from "react";
import DailyCalender from "@/components/DailyCalender";
import styled from "styled-components";
import Navbar from "@/components/Navbar";
import MonthCalender from "@/components/MonthCalender";

export default function hello() {
  return (
    <Wrapper>
      <Navbar />
      <Content>
        <LeftSection>
          <div className="daily"><DailyCalender /></div>
          <div className="todo">투두 컴포넌트</div>
        </LeftSection>
        <MiddleSection>
          <div className="calenderNav">calender menu</div>
          <MonthCalender />
        </MiddleSection>
        <RightSection>
          오른쪽 네비게이션
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
