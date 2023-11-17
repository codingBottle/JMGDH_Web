import React, { useState } from "react";
import styled from "styled-components";
import { RightArrow, LeftArrow } from "@/assets/icon/Arrow";
import theme from "@/styles/theme/theme";

export default function DailyCalender() {
  const [date, setDate] = useState(new Date());
  const [day, setDay] = useState(date.getDate());
  const [month, setMonth] = useState(date.getMonth() + 1);
  const [year, setYear] = useState(date.getFullYear());

  const numbers = Array.from({ length: 24 }, (_, index) => index);
  const lines = Array.from({ length: 24 }, (_, index) => index);

  return (
    <DailyCalenderContenter>
      <Daily>
        <div className="Top">
          <RightArrow />
          <p className="daily">Daily</p>
          <LeftArrow />
        </div>
        <div className="Bottom">
          <p className="day">
            {month}/{day}
          </p>
          <p>,{year}</p>
        </div>
      </Daily>
      <Contents>
        <table>
          <tbody>
            {[...Array(numbers)].map((i) => (
              <tr key={i.toString()}>
                {numbers.map((num) => (
                  <td className="Number" key={num}>
                    {num}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="linediv">
          {lines.map((lineIndex) => (
            <div className="line" key={lineIndex}></div>
          ))}
        </div>
      </Contents>
    </DailyCalenderContenter>
  );
}

const DailyCalenderContenter = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border: 1px solid ${theme.color.SecondaryColor.ButtonBorder};
`;

const Daily = styled.div`
  width: 100%;

  .Top {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    width: 100%;
  }
  .daily {
    margin: 0 20px;
    font-size: 18px;
    font-weight: ${theme.fontWeight.Regular};
  }
  .Bottom {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    p {
      font-size: 10px;
      font-weight: ${theme.fontWeight.bold};
    }
    .day {
      color: ${theme.color.AccentColor.SaturdayColor};
    }
  }
`;
const Contents = styled.div`
  margin-top: 0.625rem;
  overflow: auto;
  font-size: 0.625rem;

  font-weight: ${theme.fontWeight.Regular};
  table {
    margin-top: 0.625rem;
    width: 33rem;
  }

  .Number,
  table {
    border-bottom: 1px solid ${theme.color.SecondaryColor.ButtonBorder};
    border-collapse: collapse;
    text-align: center;
  }

  .Number {
    width: 1.3125rem;
    height: 1.375rem;
  }
  .linediv {
    display: flex;
  }
  .line {
    border-left: 1px solid ${theme.color.SecondaryColor.ButtonBorder};
    height: 17.4812rem;
    width: 0rem;
    margin-left: 0.625rem;
    margin-right: 0.6875rem;
  }
`;
