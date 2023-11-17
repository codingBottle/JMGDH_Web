import React, { useState } from "react";
import styled from "styled-components";
import { RightArrow, LeftArrow } from "@/assets/icon/Arrow";
import { Content } from "next/font/google";

export default function DailyCalender() {
  const [date, setDate] = useState(new Date());
  const [day, setDay] = useState(date.getDay());
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());

  const numbers = Array.from({ length: 24 }, (_, index) => index);

  return (
    <DailyCalenderContenter>
      <Daily>
        <div className="Top">
          <RightArrow />
          <p className="daily">Daily</p>
          <LeftArrow />
        </div>
        <div className="Bottom">
          <p>{day}</p>
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
      </Contents>
    </DailyCalenderContenter>
  );
}

const DailyCalenderContenter = styled.div`
  width: 100%;
  height: 100%;

  border: 1px solid black;
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
  }
  .Bottom {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    p {
      font-size: 10px;
    }
  }
`;
const Contents = styled.div`
  width: 100%;
  height: 80%;
  margin-top: 10px;
  overflow: auto;
  table {
    margin-top: 10px;
    width: 185%;
  }
  .Number {
    width: 40px;
  }
`;
