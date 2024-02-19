import React, { useState } from "react";
import styled from "styled-components";
import theme from "@/theme/theme";
import CalendarComponent from "./CalendarComponent"; // 예시로 사용한 캘린더 컴포넌트
import DailyCalender from "./DailyCalender";
interface CalenderNavbarProps {
  onButtonClick: (value: string) => void;
}
export default function CalenderNavbar({ onButtonClick }: CalenderNavbarProps) {
  const [calendarVisible, setCalendarVisible] = useState(false);

  const currentDate = new Date();
  const formattedDate = {
    year: currentDate.getFullYear(),
    month: (currentDate.getMonth() + 1).toString().padStart(2, "0"),
  };

  const handleSelectChange = () => {
    // 여기에 캘린더를 나타내거나 숨기는 로직 추가
    setCalendarVisible(!calendarVisible);
    onButtonClick(formattedDate);
  };

  return (
    <CalenderNavbarCss>
      <div>
        <button className="todaybtn">TODAY</button>
        <button className="arrowbtn">&lt;</button>
        <button className="arrowbtn">&gt;</button>
        <button
          onClick={handleSelectChange}
          style={{ width: "149px", height: "40px", padding: "14px,8.5px," }}
        >
          {formattedDate.year}년 {formattedDate.month}월 ▼
        </button>
        {calendarVisible && <CalendarComponent />} {/* 캘린더 컴포넌트 */}
      </div>
      <div>
        <button className="onebtn" onClick={() => onButtonClick("M")}>
          M
        </button>
        <button className="onebtn" onClick={() => onButtonClick("W")}>
          W
        </button>
        <button className="onebtn" onClick={() => onButtonClick("Y")}>
          Y
        </button>
      </div>
    </CalenderNavbarCss>
  );
}

const CalenderNavbarCss = styled.div`
  width: 100%;
  height: 100%;
  padding: 0.875rem 1.25rem;
  margin: 0 auto;
  border: 0.0625rem solid ${theme.color.SecondaryColor.Border};
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    background-color: ${theme.color.PrimaryColor.PrimaryWhite};
    border: 0.0625rem solid ${theme.color.SecondaryColor.ButtonBorder};
    font-size: 1rem;
    font-weight: ${theme.fontWeight.Regular};
  }

  .todaybtn {
    height: 2.5rem;
    width: 5.375rem;
    margin-right: 0.9375rem;
  }

  .onebtn {
    height: 2.5rem;
    width: 2.5rem;
    margin-right: 15px;
  }

  .arrowbtn {
    height: 2.5rem;
    width: 2.5rem;
    margin-right: 5px;
  }
`;

const StyledSelect = styled.select`
  height: 2.5rem;
  width: 149px;
  margin-left: 10px;
  font-size: 1rem;
  font-weight: ${theme.fontWeight.Regular};
  text-align: center;
  background-color: ${theme.color.PrimaryColor.PrimaryWhite};
  border: 0.0625rem solid ${theme.color.SecondaryColor.ButtonBorder};
`;
