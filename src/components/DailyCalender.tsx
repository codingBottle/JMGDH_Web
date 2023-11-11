import React from "react";
import styled from "styled-components";
import { RightArrow, LeftArrow } from "@/assets/icon/Arrow";
export default function DailyCalender() {
  return (
    <Container>
      <RightArrow />
      <LeftArrow />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: yellow;
`;
