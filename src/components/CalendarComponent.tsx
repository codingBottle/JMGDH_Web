import React, { useState } from "react";
import Calendar from "react-calendar";
import styled from "styled-components";
import theme from "@/theme/theme";
import { RightArrow, LeftArrow } from "@/assets/icon/Arrow";

const CalendarComponent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  // const handlePrevMonth = () => {
  //   const newDate = new Date(selectedDate);
  //   newDate.setMonth(newDate.getMonth() - 1);
  //   setSelectedDate(newDate);
  // };

  // const handleNextMonth = () => {
  //   const newDate = new Date(selectedDate);
  //   newDate.setMonth(newDate.getMonth() + 1);
  //   setSelectedDate(newDate);
  // };

  return (
    <>
      <CalendarWrapper>
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          calendarType="US"
          locale="ko-KO" // 한글버전
          className="custom-calendar"
          minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
          maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
          next2Label={null}
          prev2Label={null}
          tileContent={({ date }) => {
            return date.getDate();
          }}
        />
        <CompleteBtn>완료</CompleteBtn>
      </CalendarWrapper>
      {showModal && (
        <Modal>
          <ModalContent>
            <p>Selected Date: {selectedDate.toDateString()}</p>
            <button onClick={closeModal}>Close Modal</button>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

const CalendarWrapper = styled.div`
  position: absolute;
  top: 150px;
  left: 480px;
  z-index: 1;
  background-color: ${theme.color.PrimaryColor.PrimaryWhite};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  padding: 16px;
  width: 254px;
  font-size: 12px;
  text-align: center;

  .react-calendar__navigation__label__labelText,
  .react-calendar__navigation__label__labelText--from {
    flex-grow: 0.5;
  }

  .react-calendar__month-view__days {
    height: 228px;
    width: 218px;
  }

  abbr {
    display: inline-block;
    font-size: 12px;
    text-decoration: none;
  }

  /* 요일 */
  .react-calendar__month-view__weekdays__weekday{
    display: inline-block;
    color: #000;
    margin-bottom: 10px;
    abbr {
      border: none;
    }
  }

  .react-calendar__month-view__weekdays {
    display: inline-block;
    color: #000 !important;
    text-align: center;
  }

  .react-calendar__tile,
  .react-calendar__month-view__days__day,
  .react-calendar__month-view__days__day--neighboringMonth {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* 저번 달 & 다음 달 일자 */
  .react-calendar__month-view__days__day--neighboringMonth{
    color: ${theme.color.GrayScale.Gray300};
  }

  .react-calendar__tile {
    border: none;
    font-size: 12px;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      background-color: ${theme.color.HoverEventColor.EventfillHover};
      border-radius: 100px;
    }
    &:focus {
      background-color: ${theme.color.HoverEventColor.EventfillHover};
      border-radius: 100px;
      border: 1px solid rgba(0, 0, 0, 0.6);
    }

    abbr {
      display: none;
    }
  }

  /* 오늘 날짜 */
  .react-calendar__tile--now{
    background-color: rgba(0, 0, 0, 0.2) !important;
    color: ${theme.color.PrimaryColor.PrimaryWhite};
    border-radius: 100px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.4) !important;
    }
  }

  /* 선택된 날짜의 배경색 변경 */
  .react-calendar__tile--active {
    background-color: ${theme.color.HoverEventColor.EventfillHover};
    border-radius: 100px;
  }

  .react-calendar__navigation {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: relative;
    margin-bottom: 10px;
    .react-calendar__navigation__arrow {
      display: inline-block;
      padding: 0 4px;
      border: none;

    }
    .react-calendar__navigation__prev-button {
      order: 2;
      display: inline-block;
      margin-right: 8px;
      font-size: 32px;
    }
    .react-calendar__navigation__next-button {
      order: 3;
      font-size: 32px;
    }
  }

  .react-calendar__navigation__label {
    display: flex;
    justify-content: flex-start;
    border: none;
    flex-grow: 0.5;
    color: ${theme.color.SecondaryColor.BasicFont};
  }

  .custom-calendar .react-calendar {
    border: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .react-calendar__navigation__label__labelText,
  .react-calendar__navigation__label__labelText--from {
    flex-grow: 0;
  }
`;

const Modal = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: ${theme.color.PrimaryColor.PrimaryWhite};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  padding: 20px;
  z-index: 1;
`;

const CompleteBtn = styled.button`
  /* width: 100%; */
  height: 27px;
  padding: 5px 90px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: ${theme.fontWeight.Regular};
`;

export default CalendarComponent;
