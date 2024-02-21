import React from 'react';
import theme from "@/theme/theme";
import styled from "styled-components";
import ShareWeek from './ShareWeek';

interface DayInfo {
  day: string;
  date: number;
  isToday: boolean;
}

const dayMapping: { [key: number]: string } = {
  0: "SUN",
  1: "MON",
  2: "TUE",
  3: "WED",
  4: "THU",
  5: "FRI",
  6: "SAT",
};

const ShareCalendar = () => {
  const now = new Date();
  const today = new Date(now.getTime());
  const dayOfWeek = now.getDay();
  const sunday = new Date(now.setDate(now.getDate() - dayOfWeek));
  const weekDays: DayInfo[] = [];
  const time = [];

  for (let i = 8; i <= 22; i++) {
    time.push(i);
  }

  for (let i = 0; i < 7; i++) {
    const currentDay = new Date(sunday.getTime() + i * 24 * 60 * 60 * 1000);
    weekDays.push({
      day: dayMapping[currentDay.getDay()],
      date: currentDay.getDate(),
      isToday:
        currentDay.getDate() === today.getDate() &&
        currentDay.getMonth() === today.getMonth() &&
        currentDay.getFullYear() === today.getFullYear(),
    });
  }

  return (
    <CalendarWrapper>
      <div className='week-box my-week'>
        <Title>
          <button>◀️</button>
          <h1>나의 주간 일정</h1>
          <button>▶️</button>
        </Title>
        <ShareWeek />
        <CalendarContent>
          <Time>
            {time.map((time) => (
              <p key={time}>{time}</p>
            ))}
          </Time>
          <TodoWrapper>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
          </TodoWrapper>
        </CalendarContent>
        <Footer></Footer>
      </div>
      <div className='week-box team-week'>
        <Title>
          <button>◀️</button>
          <h1>oo팀의 주간 일정</h1>
          <button>▶️</button>
        </Title>
        <ShareWeek />
        <CalendarContent>
          <Time>
            {time.map((time) => (
              <p key={time}>{time}</p>
            ))}
          </Time>
          <TodoWrapper>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </TodoWrapper>
        </CalendarContent>
        <Footer>
          <button>일정 등록</button>
          <button>불러오기</button>
        </Footer>
      </div>
    </CalendarWrapper>
  )
}

export default ShareCalendar;

const CalendarWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  height: 100%;
  
  .week-box {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  padding: 60px 0 30px 0;

  h1 {
    margin: 0;
    padding: 0;
    font-size: 24px;
    font-weight: ${theme.fontWeight.Regular};
  }

  button {
    color: ${theme.color.GrayScale.Gray300};
    background-color: transparent;
    border: none;
    font-size: 32px;
  }
`;

const CalendarContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-top: 1px solid ${theme.color.SecondaryColor.ButtonBorder};
`;

const Time = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 32px;
  height: 100%;
  padding: 10px;
  border-left: 1px solid ${theme.color.SecondaryColor.ButtonBorder};
`;

const TodoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100% - 32px);
  height: 100%;

  div {
    width: 100%;
    height: 100%;
    border: 1px solid ${theme.color.SecondaryColor.ButtonBorder};
  }
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 88px;
  padding: 40px;
  border: 1px solid ${theme.color.SecondaryColor.ButtonBorder};

  button {
    width: 100px;
    height: 40px;
    line-height: 40px;
    background-color: transparent;
    border: 1px solid ${theme.color.SecondaryColor.ButtonBorder};
    border-radius: 4px;
  }
`;