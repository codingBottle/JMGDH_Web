import React from "react";
import DailyCalender from "@/components/DailyCalender";
import styled from "styled-components";

export default function hello() {
  return (
    <Container>
      sdfsddsafs
      <DailyCalender />
    </Container>
  );
}

const Container = styled.div`
  width: 257px;
  height: 402px;
  background-color: green;
`;
