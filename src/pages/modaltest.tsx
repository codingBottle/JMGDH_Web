import React from "react";
import styled from "styled-components";
import SeeMore from "@/components/Modal/SeeMore";
import SeeMoreTow from "@/components/Modal/SeeMoreTow";
import ScheduleAdd from "@/components/Modal/ScheduleAdd";

export default function ModalTest() {
  return (
    <Wrapper>
      <SeeMore />
      <SeeMoreTow />
      <ScheduleAdd />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;
