import React, { useState } from 'react';
import styled from "styled-components";
import theme from "@/styles/theme/theme";



const MonthCalender = () => {
  const [date, setDate] = useState(new Date());

  const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  const renderCalender = () => {
    // const week = 5;
    const day = 7;
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = getDaysInMonth(year, month);

    const firstDayOfWeek = new Date(year, month, 1).getDay();

    const calendarDays: JSX.Element[] = [];

    for (let i = 0; i < firstDayOfWeek; i++) {
      calendarDays.push(<td key={`empty-${i}`}></td>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push(<td key={`day-${day}`}>{day}</td>);
    }

    const totalCells = 7 * Math.ceil((firstDayOfWeek + daysInMonth) / 7);
    const emptyCells = totalCells - calendarDays.length;

    for (let i = 0; i < emptyCells; i++) {
      calendarDays.push(<td key={`empty-${i + daysInMonth}`}></td>);
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


  }
  
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
        {renderCalender()}
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
    border: 1px solid ${theme.color.SecondaryColor.ButtonBorder};
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
      }
    }
  }

  tbody {
    display: flex;
    flex-direction: column;
    width: 100%;
    /* height: calc(100% - 38px); */
    height: 100%;
    tr {
      display: flex;
      flex-direction: row;
      flex: 1;
      td {
        flex: 1;
      }
    }
  }
`;