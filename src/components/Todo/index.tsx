import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { RightArrow, LeftArrow } from '@/assets/icon/Arrow';
import theme from '@/theme/theme';
import CopyButton from '@/assets/icon/Copy';
import WeekList from './WeekList';
import TodoTagList from './TodoTagList';

const Todo = () => {
  const [date, setDate] = useState(new Date());
  const [day, setDay] = useState(date.getDate());
  const [month, setMonth] = useState(date.getMonth() + 1);
  const [year, setYear] = useState(date.getFullYear());
  const isSunday = date.getDay() === 0;

  const handlePrevClick = () => {
    date.setDate(day - 1);
    setDate(date);
    setDay(date.getDate());
    setMonth(date.getMonth() + 1);
    setYear(date.getFullYear());
  };

  const handleNextClick = () => {
    date.setDate(day + 1);
    setDate(date);
    setDay(date.getDate());
    setMonth(date.getMonth() + 1);
    setYear(date.getFullYear());
  };

  return (
    <TotoContainer>
      <DayNTodo>
        <div className="Top">
          <p
            className="day"
            style={{ color: isSunday ? '#DA4A4A' : '#8BC0D6  ' }}
          >
            {month}/{day}
          </p>
          <p style={{ color: '#A3A3A3' }}>,{year}</p>
        </div>

        <div className="Bottom">
          <p className="Todo">TODO</p>
          <RightArrow onClick={() => handlePrevClick()} />
          <LeftArrow onClick={() => handleNextClick()} />
          <Image
            className="copyImg"
            src={'/todoCopy.png'}
            alt="copy"
            width={20}
            height={20}
          />
        </div>
      </DayNTodo>
      <WeekList />
      <TodoTagList date={date} />
    </TotoContainer>
  );
};

export default Todo;

const TotoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100%;

  border: 1px solid ${theme.color.SecondaryColor.ButtonBorder};

  overflow: auto;
  overflow-x: hidden;
`;

const DayNTodo = styled.div`
  width: 100%;
  .Top {
    margin: 2.375rem 0px 0.3125rem 0.625rem;
    display: flex;
    justify-content: left;
    width: auto;

    p {
      font-size: 0.625rem;
      font-weight: ${theme.fontWeight.bold};
    }
    .day {
      color: ${theme.color.AccentColor.SaturdayColor};
    }
  }
  .Todo {
    font-size: 1.125rem;
    font-weight: ${theme.fontWeight.Regular};
  }
  .Bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 0px 0.625rem 0.625rem;
    width: 100%;
    p {
      font-size: 1.125rem;
      font-weight: ${theme.fontWeight.Regular};
      margin-right: 0.8125rem;
    }
    .copyImg {
      margin-right: 0.625rem;
      cursor: pointer;
    }
    :nth-child(4) {
      margin-left: 8.125rem;
    }
  }
`;
