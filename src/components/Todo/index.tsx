import React, { useState } from 'react';
import styled from 'styled-components';
import { RightArrow, LeftArrow } from '@/assets/icon/Arrow';
import theme from '@/styles/theme/theme';
import CopyButton from '@/assets/icon/Copy';
import WeekList from './WeekList';
import TodoTagList from './TodoTagList';

const Todo = () => {
  const [date, setDate] = useState(new Date());
  const [day, setDay] = useState(date.getDate());
  const [month, setMonth] = useState(date.getMonth() + 1);
  const [year, setYear] = useState(date.getFullYear());

  return (
    <TotoContainer>
        <DayNTodo>
          <div className="Top">
            <p className="day">
              {month}/{day}
            </p>
            <p>,{year}</p>
          </div>
          <div className="Bottom">
            <p className="Todo">To Do</p>
            <RightArrow />
            <LeftArrow />
            <CopyButton />
          </div>
        </DayNTodo>
        <WeekList />
        <TodoTagList />
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
    margin: 38px 0px 5px 10px;
    display: flex;
    justify-content: left;
    width: auto;

    p {
      font-size: 10px;
      font-weight: ${theme.fontWeight.bold};
    }
    .day {
      color: ${theme.color.AccentColor.SaturdayColor};
    }
  }
  .Todo {
    font-size: 18px;
    font-weight: ${theme.fontWeight.Regular};
  }
  .Bottom {
    display: flex;
    justify-content: left;
    align-items: center;
    margin: 0px 0px 10px 10px;
    width: 100%;
    p {
      font-size: 18px;
      font-weight: ${theme.fontWeight.Regular};
      margin-right: 13px;
    }
    svg {
      cursor: pointer;
      margin-right: 1px;
    }
    :nth-child(4) {
      margin-left: 110px;
    }
  }
`;
