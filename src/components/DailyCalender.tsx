import React, { useState } from "react";
import styled from "styled-components";
import { RightArrow, LeftArrow } from "@/assets/icon/Arrow";
export default function DailyCalender() {
  const [date, setDate] = useState(new Date());
  const [day, setDay] = useState(date.getDay());
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  return (
    <DailyCalenderContenter>
      <Daily>
        <div className="Top">
          <RightArrow />
          <p className="daily">Daily</p>
          <LeftArrow />
        </div>
        <div className="Bottom"></div>
      </Daily>
    </DailyCalenderContenter>
  );
}

const DailyCalenderContenter = styled.div`
  width: 100%;
  height: 100%;
  background-color: yellow;
  border: 1px solid black;
  display: flex;
  justify-content: center;
`;

const Daily = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10%;
  background-color: red;

  .Top {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  .daily {
    margin: 0 20px;
    font-size: 18px;
  }
`;
