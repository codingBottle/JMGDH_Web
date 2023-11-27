import React, { useState } from 'react';
import styled from "styled-components";
import theme from "@/styles/theme/theme";

const MonthCalender = () => {
  const [date, setDate] = useState(new Date());

  const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const renderCalendar = (): JSX.Element[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
  
    const firstDayOfWeek = new Date(year, month, 1).getDay();
  
    const calendarDays: JSX.Element[] = [];
  
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevMonthYear = month === 0 ? year - 1 : year;
    const daysInPrevMonth = getDaysInMonth(prevMonthYear, prevMonth);
  
    const totalCells = 7 * Math.ceil((firstDayOfWeek + daysInMonth) / 7);
  
    let day = 1; // 현재 달의 날짜
  
    // 이전 달의 마지막 일자
    const prevMonthEndDay = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
  
    for (let i = 0; i < totalCells; i++) {
      if (i < firstDayOfWeek) {
        // 이전 달의 날짜 출력
        const prevMonthDay = daysInPrevMonth - (prevMonthEndDay - i);
        calendarDays.push(
          <td key={`day-${i}`} className="prev-month-day">
            <span>{prevMonthDay}</span>
          </td>
        );
      } else if (day <= daysInMonth) {
        // 현재 달의 날짜 출력
        calendarDays.push(
          <td>
            <span>{day}</span>
          </td>
        );
        day++;
      } else {
        // 다음 달의 날짜 출력
        const nextMonthDay = i - (firstDayOfWeek + daysInMonth) + 1;
        calendarDays.push(
          <td key={`day-${i}`} className="next-month-day">
            <span>{nextMonthDay}</span>
          </td>
        );
      }
    }
    const weeks: JSX.Element[] = [];
    let week: JSX.Element[] = [];
  
    calendarDays.forEach((cell, index) => {
      week.push(cell);
  
      if ((index + 1) % 7 === 0) {
        weeks.push(<tr key={`week-${index / 7}`}>{week}</tr>);
        week = [];
      }
    });
    return weeks;
  };



  
  return (
    <CalenderWrapper>
      <Calender>
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>
          {renderCalendar()}
        </tbody>
      </Calender>
    </CalenderWrapper>
  )
}

export default MonthCalender;

const CalenderWrapper = styled.div`
  width: 100%;
  height: 100%;
  color: ${theme.color.SecondaryColor.BasicFont};
  background-color: ${theme.color.PrimaryColor.PrimaryWhite};
`;

const Calender = styled.table`
  width: 100%;
  height: 100%;
  border-collapse: collapse;

  th, td {
    border: 0.5px solid ${theme.color.SecondaryColor.ButtonBorder};
    font-size: 14px;
    font-weight: ${theme.fontWeight.Regular};
    
    &:first-child {
      color: ${theme.color.AccentColor.SundayColor};
    }
    &:last-child {
      color: ${theme.color.AccentColor.SaturdayColor};
    }
  }

  thead {
    width: 100%;
    tr {
      display: flex;
      flex-direction: row;
      th {
        flex: 1;
        text-align: left;
        height: 38px;
        line-height: 38px;
        padding-left: 10px;
      }
    }
  }

  tbody {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    tr {
      display: flex;
      flex-direction: row;
      flex: 1;
      td {
        flex: 1;
        padding-top: 10px;
        padding-left: 10px;
        cursor: pointer;
      }
      .prev-month-day,
      .next-month-day {
        background-color: ${theme.color.SecondaryColor.Border};
        span {
          opacity: 0.5;
        }
      }
    }
  }
`;