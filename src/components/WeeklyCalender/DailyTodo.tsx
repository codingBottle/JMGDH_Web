import { todo } from 'node:test';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface Todo {
  id: number;
  title: string;
  colorCode: string;
  startDate: string;
  endDate: string;
  timeOfStartDate: string;
  timeOfEndDateTime: string;
  allDay: boolean;
  repeat: boolean;
}

interface DailyTodoProps {
  date: string; // YYYY-MM-DD 형식
  todos: Todo[];
}

const DailyTodo = ({ date, todos }: DailyTodoProps) => {
  // api 연결 시 작동될 부분
  useEffect(() => {
    // date에 해당하는 todo들을 API를 통해 가져옴.
    // 가져온 todo들을 setTodos를 통해 상태를 업데이트합니다.
  }, [date]);

  const allDayTodos = todos.filter(
    (todo) =>
      todo.allDay === true && todo.startDate.slice(-2) === date.slice(-2)
  );

  console.log('allDayTodos', allDayTodos);

  return (
    <TodoContainer>
      {allDayTodos.slice(0, 2).map((todo) => {
        if (todo.allDay && todo.startDate.slice(-2) === date.slice(-2)) {
          return (
            <TodoItem key={todo.id} colorCode={todo.colorCode}>
              {todo.title}
            </TodoItem>
          );
        }
      })}
      {allDayTodos.length > 2 && (
        <MoreItem>{allDayTodos.length - 2}개 더보기</MoreItem>
      )}
    </TodoContainer>
  );
};

export default DailyTodo;

const TodoContainer = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  width: 100%;
  height: 10rem;

  padding: 0.625rem 0;
  gap: 0.625rem;
`;

const TodoItem = styled.li<{ colorCode: string }>`
  //styled.li<{ color: string }>
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  width: 80%;
  height: 2.5rem;

  padding-left: 1.25rem;

  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  color: #191919;
  background-color: #fafafa;
  list-style: none;

  border-radius: 0.25rem;

  /* 투두앞의 태그 색깔 */
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 20%;
    width: 0.625rem;
    min-width: 0.25rem;
    height: 60%;

    border-radius: 0.25rem;
    background-color: ${(props) => '#' + props.colorCode};
  }
`;

const MoreItem = styled.li`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  width: 80%;
  height: 2.5rem;

  padding-left: 1.25rem;

  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  color: #191919;
  background-color: #fafafa;
  list-style: none;

  border-radius: 0.25rem;

  &:hover {
    cursor: pointer;
  }
`;
