import React from "react";
import DailyCalender from "@/components/DailyCalender";
import styled from "styled-components";
import Navbar from "@/components/Navbar";
import Todo from "@/components/Todo";

export default function hello() {
  return (
    <div>
      <Navbar />
      <Container>
        <DailyCalender />
      </Container>
      <TodoContainer>
        <Todo />
      </TodoContainer>
    </div>
  );
}

const Container = styled.div`
  width: 266px;
  height: 402px;
`;

const TodoContainer = styled.div`
  width: 266px;
  height: 598px;
`;
