import React, { useState } from "react";
import styled from "styled-components";
import theme from "@/theme/theme";
import CalendarComponent from "./CalendarComponent";

interface CalenderNavbarProps {
  onButtonClick: (value: any) => void;
  onToDay: (value: Date) => void;
  onUP: (value: Number) => void;
  onDown: (value: Number) => void;
}

export default function CalenderNavbar({
  onButtonClick,
  onToDay,
  onUP,
  onDown,
}: CalenderNavbarProps) {
  const [calendarVisible, setCalendarVisible] = useState(false);
  const currentDate = new Date();
  const [formattedDate, setFormattedDate] = useState({
    year: currentDate.getFullYear(),
    month: (currentDate.getMonth() + 1).toString().padStart(2, "0"),
  });

  const handleSelectChange = () => {
    setCalendarVisible(!calendarVisible);
    onButtonClick(formattedDate);
  };
  const handleMonthChange = (delta: number) => {
    // delta가 양수이면 월을 증가, 음수이면 월을 감소
    const newMonth = parseInt(formattedDate.month, 10) + delta;

    // 월을 1부터 12까지 유지하도록 설정
    const clampedMonth = Math.max(1, Math.min(newMonth, 12));

    setFormattedDate((prevDate) => ({
      ...prevDate,
      month: clampedMonth.toString().padStart(2, "0"),
    }));
  };
  const handleToday = () => {
    const today = new Date();
    const formattedToday = {
      year: today.getFullYear(),
      month: (today.getMonth() + 1).toString().padStart(2, "0"),
    };

    setFormattedDate(formattedToday);
  };

  return (
    <CalenderNavbarCss>
      <div>
        <button
          className="todaybtn"
          onClick={() => {
            onToDay(new Date());
            handleToday();
          }}
        >
          TODAY
        </button>

        <button
          className="arrowbtn"
          onClick={() => {
            handleMonthChange(-1);
            onDown(-1);
          }}
        >
          <svg
            width="16"
            height="20"
            viewBox="0 0 16 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.41354 10.665L15.5664 19.9549C15.606 19.9794 15.6536 19.9946 15.7037 19.9988C15.7538 20.003 15.8044 19.996 15.8497 19.9787C15.8949 19.9613 15.9331 19.9343 15.9597 19.9007C15.9863 19.8671 16.0002 19.8283 16 19.7887L16 17.7492C16 17.6199 15.9227 17.4959 15.795 17.4168L3.69419 10.0001L15.795 2.58346C15.926 2.50431 16 2.3803 16 2.25102L16 0.211504C16 0.034729 15.7412 -0.0628929 15.5664 0.0452823L0.41354 9.33522C0.28475 9.41408 0.180565 9.51495 0.108906 9.63016C0.0372465 9.74538 -1.18425e-06 9.8719 -1.1934e-06 10.0001C-1.20256e-06 10.1283 0.0372464 10.2548 0.108906 10.3701C0.180565 10.4853 0.28475 10.5861 0.41354 10.665Z"
              fill="#757575"
            />
          </svg>
        </button>
        <button
          className="arrowbtn"
          onClick={() => {
            handleMonthChange(1);
            onUP(1);
          }}
        >
          <svg
            width="16"
            height="20"
            viewBox="0 0 16 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.5865 9.335L0.433614 0.0450593C0.394019 0.0205909 0.346434 0.00538495 0.296325 0.00118745C0.246217 -0.00301006 0.195616 0.00397121 0.150334 0.0213296C0.105053 0.038688 0.066927 0.0657196 0.0403352 0.0993197C0.0137434 0.13292 -0.000236003 0.171726 3.01791e-06 0.211281L3.0506e-06 2.25079C3.05267e-06 2.38008 0.0773137 2.50408 0.205044 2.58324L12.3058 9.99989L0.205044 17.4165C0.0739526 17.4957 3.29692e-06 17.6197 3.299e-06 17.749L3.33168e-06 19.7885C3.33452e-06 19.9653 0.258825 20.0629 0.433614 19.9547L15.5865 10.6648C15.7153 10.5859 15.8194 10.485 15.8911 10.3698C15.9628 10.2546 16 10.1281 16 9.99989C16 9.87168 15.9628 9.74516 15.8911 9.62994C15.8194 9.51473 15.7153 9.41386 15.5865 9.335Z"
              fill="#757575"
            />
          </svg>
        </button>
        <button
          onClick={handleSelectChange}
          style={{
            width: "149px",
            height: "40px",
            padding: "14px,8.5px,",
            marginLeft: "13px",
          }}
        >
          {formattedDate.year}년 {formattedDate.month}월 ▼
        </button>
        {calendarVisible && <CalendarComponent />}
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
    margin-right: 8px;
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
