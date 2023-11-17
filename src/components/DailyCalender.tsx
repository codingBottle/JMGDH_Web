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
  console.log(date);

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
                  <td colSpan={2} className="Number" key={num}>
                    {num}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td>f</td>
              <td>f</td>
            </tr>
          </tbody>
        </table>
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
  height: 15%;
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
  width: 100%;
  height: 80%;
  margin-top: 10px;
  overflow: auto;
  font-size: 10px;

  font-weight: ${theme.fontWeight.Regular};
  table {
    margin-top: 10px;
    width: 200%;
  }
  table,
  th,
  td {
    border: 1px solid ${theme.color.SecondaryColor.ButtonBorder};
    border-collapse: collapse;
    text-align: center;
  }
  .Number {
    width: 40px;
  }
`;
