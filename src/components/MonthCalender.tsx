import React from 'react';
import styled from "styled-components";
import theme from "@/styles/theme/theme";

const MonthCalender = () => {
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
          <tr>
            <td></td>
          </tr>
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

  th, td {
    border: 1px solid ${theme.color.SecondaryColor.ButtonBorder};
    font-size: 14px;
    font-weight: ${theme.fontWeight.Regular};
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
    width: 100%;
    height: calc(100% - 38px);
    background-color: beige;
  }
`;