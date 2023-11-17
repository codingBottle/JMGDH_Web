import React from "react";
import DailyCalender from "@/components/DailyCalender";
import styled from "styled-components";

export default function hello() {
  return (
    <Container>
      <DailyCalender />
    </Container>
  );
}

const Container = styled.div`
  width: 266px;
  height: 402px;
`;
