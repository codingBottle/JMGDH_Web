import React from "react";
import DailyCalender from "@/components/DailyCalender";
import styled from "styled-components";
import Navbar from "@/components/Navbar";
import CalenderNavbar from "@/components/CalenderNavbar";

export default function hello() {
  return (
    <div>
      <Navbar />
      <MainContent>
        <div className="Leftbox">
          <Container>
            <DailyCalender />
          </Container>
        </div>
        <div className="Rightbox">
          <div className="CalNavBar">
            <CalenderNavbar />
          </div>
        </div>
      </MainContent>
    </div>
  );
}

const MainContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .Leftbox {
    display: flex;
    justify-content: left;
    width: 266px;
    height: 100%;
  }
  .Rightbox {
    display: flex;
    justify-content: left;
    width: 100%;
    height: 100%;
    .CalNavBar {
      width: 1576px;
      height: 68px;
    }
  }
`;

const Container = styled.div`
  width: 266px;
  height: 402px;
`;
