import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import WeeklyList from './WeeklyList';
import WeekTodoView from './WeekTodoView'; // WeekView를 불러옴

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

const WeeklyCalender = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [temp, setTemp] = useState();

  const now = new Date();
  const today = new Date(now.getTime());
  const dayOfWeek = now.getDay();
  const sunday = new Date(now.setDate(now.getDate() - dayOfWeek));

  // 나중에 api 연결 시 사용할 부분
  useEffect(() => {
  }, []);

  const fetchTodos = async () => {
    const response = await fetch('/api/todos');
    const data = await response.json();

    setTodos(data);
  };

  return (
    <Main>
      <WeeklyList />
      <WeekTodoView todos={todos} startDate={sunday} />
    </Main>
  );
};

export default WeeklyCalender;

const Main = styled.main`
  width: 100%;
  height: 100%;
  padding-left: 3rem;

  overflow: auto;
`;
