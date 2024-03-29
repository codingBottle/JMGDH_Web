import React, { use, useEffect, useState } from "react";
import styled from "styled-components";
import WeeklyList from "./WeeklyList";
import WeekTodoView from "./WeekTodoView"; // WeekView를 불러옴
import axios from "axios";

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

// api 기본 주소
const NEXT_PUBLIC_BASE_URL = `https://calendars2.duckdns.org`;

const WeeklyCalender = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const now = new Date();
  const today = new Date(now.getTime());
  const dayOfWeek = now.getDay();
  const sunday = new Date(now.setDate(now.getDate() - dayOfWeek));

  const month = () => {
    if (sunday.getMonth() + 1 < 10) {
      return "0" + (sunday.getMonth() + 1);
    } else {
      return sunday.getMonth() + 1;
    }
  };

  const date = () => {
    if (sunday.getDate() < 10) {
      return "0" + sunday.getDate();
    } else {
      return sunday.getDate();
    }
  };

  const endDate = () => {
    if (sunday.getDate() + 6 < 10) {
      return "0" + (sunday.getDate() + 6);
    } else {
      return sunday.getDate() + 6;
    }
  };

  // yyyy-mm-dd 형식으로 변환
  const weekStart = sunday.getFullYear() + "-" + month() + "-" + date();

  const weekEnd = sunday.getFullYear() + "-" + month() + "-" + endDate();

  useEffect(() => {
    // accessToken이 있을 경우
    if (localStorage.getItem("accessToken")) {
      axios
        .get(
          `${NEXT_PUBLIC_BASE_URL}/schedules/start-date/${weekStart}/end-date/${weekEnd}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
        .then((res) => {
          console.log("res:", res.data?.data);
          setTodos(res.data.data.schedules);
        });
    }
  }, [weekEnd, weekStart]);

  return (
    <Main>
      <WeeklyList todos={todos} />
      <WeekTodoView todos={todos} startDate={sunday} />
    </Main>
  );
};

export default WeeklyCalender;

const Main = styled.main`
  width: 76.5vw;
  height: 100%;
  padding-left: 3rem;

  overflow: auto;
`;
