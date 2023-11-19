import React from "react";
import DailyCalender from "@/components/DailyCalender";
import styled from "styled-components";
import Navbar from "@/components/Navbar";

export default function hello() {
  return (
    <div>
      <Navbar />
      <Container>
        <DailyCalender />
      </Container>
    </div>
  );
}

const Container = styled.div`
  width: 266px;
  height: 402px;
`;
