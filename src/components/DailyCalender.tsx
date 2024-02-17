import React, { useState, useRef } from "react";
import styled from "styled-components";
import { RightArrow, LeftArrow } from "@/assets/icon/Arrow";
import theme from "@/theme/theme";

export default function DailyCalender() {
  const [date, setDate] = useState(new Date());
  const [day, setDay] = useState(date.getDate());
  const [month, setMonth] = useState(date.getMonth() + 1);
  const [year, setYear] = useState(date.getFullYear());

  const [dragStart, setDragStart] = useState<number | null>(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragStart !== null) {
      const delta = e.clientX - dragStart;
      if (containerRef.current) {
        containerRef.current.scrollLeft = scrollLeft - delta;
      }
    }
  };

  const handleMouseUp = () => {
    setDragStart(null);
    if (containerRef.current) {
      setScrollLeft(containerRef.current.scrollLeft);
    }
  };

  const numbers = Array.from({ length: 24 }, (_, index) => index);

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
    console.log(date);
  };

  return (
    <DailyCalenderContenter>
      <Daily>
        <div className="Top">
          <p className="day">
            {month}/{day}
          </p>
          <p>,{year}</p>
        </div>

        <div className="Bottom">
          <p className="daily">Daily</p>
          <RightArrow onClick={() => handlePrevClick()} />
          <LeftArrow onClick={() => handleNextClick()} />
        </div>
      </Daily>

      <Contents
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        ref={containerRef}
      >
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
          {numbers.map((lineIndex) => (
            <div className="line" key={lineIndex}></div>
          ))}
        </div>
      </Contents>
    </DailyCalenderContenter>
  );
}

const DailyCalenderContenter = styled.div`
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
  width: 100%;
  height: 100%;
  border: 1px solid ${theme.color.SecondaryColor.ButtonBorder};
  background-color: #ffffff;
`;

const Daily = styled.div`
  width: 100%;
  .Top {
    display: flex;
    width: auto;
    margin: 38px 0px 0px 21px;
    justify-content: left;

    p {
      font-size: 10px;
      font-weight: ${theme.fontWeight.bold};
    }
    .day {
      color: ${theme.color.AccentColor.SaturdayColor};
    }
  }
  .daily {
    font-size: 18px;
    font-weight: ${theme.fontWeight.Regular};
  }
  .Bottom {
    display: flex;
    width: 100%;
    margin: 0px 0px 0px 21px;
    justify-content: left;
    align-items: center;

    p {
      margin-right: 13px;
      font-size: 18px;
      font-weight: ${theme.fontWeight.Regular};
    }
    svg {
      margin-right: 1px;
      cursor: pointer;
    }
  }
`;
const Contents = styled.div`
  overflow: auto;
  margin-top: 22px;
  font-size: 0.625rem;
  cursor: Pointer;

  font-weight: ${theme.fontWeight.Regular};
  table {
    width: 960px;
  }

  .Number,
  table {
    border-bottom: 1px solid ${theme.color.SecondaryColor.ButtonBorder};
    border-collapse: collapse;
    text-align: center;
  }

  .Number {
    width: 40px;
    height: 1.375rem;
  }
  .linediv {
    display: flex;
  }
  .line {
    margin-left: 19px;
    margin-right: 20px;
    border-left: 1px solid ${theme.color.SecondaryColor.ButtonBorder};
    width: 0rem;
    height: 17.4812rem;
  }
`;
