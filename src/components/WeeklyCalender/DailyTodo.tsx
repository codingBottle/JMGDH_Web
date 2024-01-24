import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface Todo {
  id: number;
  content: string;
  color: string;
}

interface DailyTodoProps {
  date: string; // YYYY-MM-DD 형식
}

const DailyTodo = ({ date }: DailyTodoProps) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  // api 연결 시 작동될 부분
  useEffect(() => {
    // date에 해당하는 todo들을 API를 통해 가져옴.
    // 가져온 todo들을 setTodos를 통해 상태를 업데이트합니다.
  }, [date]);

  return (
    <TodoContainer>
      {/*  목업 데이터 */}
      <TodoItem>핫식스 3개 마시기</TodoItem>
      {todos.slice(0, 2).map((todo) => (
        <TodoItem key={todo.id} color={todo.color}>
          {todo.content}
        </TodoItem>
      ))}
      {todos.length > 2 && <MoreItem>{todos.length - 2}개 더보기</MoreItem>}
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

  padding: 0.625rem;
  gap: 0.625rem;
  background-color: bisque;
`;

const TodoItem = styled.li`
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
    /* background-color: ${(props) => props.color}; */
    background-color: red;
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
