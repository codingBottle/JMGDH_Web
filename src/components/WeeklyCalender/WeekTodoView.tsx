import React from 'react';
import styled from 'styled-components';
import TimeTodo from './TimeTodo';

interface Todo {
  id: number;
  title: string;
  startDate: string;
  timeOfStartDate: string;
  endDate: string;
  timeOfEndDateTime: string;
  allDay: boolean;
  repeat: boolean;
  tag: string;
}

interface WeekViewProps {
  todos: Todo[];
  startDate: Date; // 주의 시작 날짜
}

const WeekTodoView = ({ todos, startDate }: WeekViewProps) => {
  // 일주일의 날짜를 생성합니다.
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    return date;
  });

  // 각 날짜에 대해 TimeTodo 컴포넌트를 렌더링합니다.
  return (
    <Main>
      {dates.map((date, index) => (
        <TimeTodo
          key={date.toString()}
          todos={todos}
          date={date}
          showHours={index === 0}
        />
      ))}
    </Main>
  );
};

export default WeekTodoView;

const Main = styled.main`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`;
