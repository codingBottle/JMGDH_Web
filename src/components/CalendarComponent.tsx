import React, { useState } from "react";
import Calendar from "react-calendar";
import styled from "styled-components";
import theme from "@/theme/theme";

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

  return (
    <>
      <CalendarWrapper>
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          calendarType="US"
          locale="en-EN"
          className="custom-calendar"
          minDetail="month"
          maxDetail="month"
          next2Label={null}
          prev2Label={null}
          tileContent={({ date }) => {
            return date.getDate();
          }}
        />
        <CompleteBtn>완료</CompleteBtn>
      </CalendarWrapper>
      {/* {showModal && (
        <Modal>
          <ModalContent>
            <p>Selected Date: {selectedDate.toDateString()}</p>
            <button onClick={closeModal}>Close Modal</button>
          </ModalContent>
        </Modal>
      )} */}
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
  border-radius: 20px;
  padding: 16px;
  width: 254px;
  text-align: center;

  .react-calendar {
    width: 350px;
    max-width: 100%;
    background: transparent;
    border: none;
    line-height: 0;
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
  .react-calendar__month-view__weekdays {
    display: inline-block;
    text-align: center;
    font-size: 14px;
    font-weight: ${theme.fontWeight.Regular};
    margin-bottom: 10px;
  }

  .react-calendar__month-view__weekdays__weekday {
    display: inline-block;
    color: #000;

    abbr {
      border: none;
    }
  }

  .react-calendar__tile,
  .react-calendar__month-view__days__day,
  .react-calendar__month-view__days__day--neighboringMonth {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* 저번 달 & 다음 달 일자 */
  .react-calendar__month-view__days__day--neighboringMonth {
    color: ${theme.color.GrayScale.Gray300} !important;
  }

  .react-calendar__month-view__days__day--weekend {
    color: #000;
  }

  .react-calendar__tile {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    color: #000;
    border: none;
    font-size: 14px;
    padding: 0;
    &:hover {
      background-color: ${theme.color.HoverEventColor.EventfillHover};
      border-radius: 100px;
    }
    &:focus {
      color: #000;
      background-color: ${theme.color.HoverEventColor.EventfillHover};
      border-radius: 100px;
      border: 1px solid rgba(0, 0, 0, 0.6);
    }

    abbr {
      display: none;
    }
  }

  /* 오늘 날짜 */
  .react-calendar__tile--now {
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
    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }

  .react-calendar__navigation {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: relative;
    margin-bottom: 10px;

    button {
      background-color: transparent;
    }
    .react-calendar__navigation__arrow {
      display: inline-block;
      border: none;
    }
    .react-calendar__navigation__prev-button {
      order: 2;
      display: inline-block;
      font-size: 24px;
    }
    .react-calendar__navigation__next-button {
      order: 3;
      font-size: 24px;
    }
  }

  .react-calendar__navigation__label {
    display: flex;
    justify-content: flex-start;
    border: none;
    flex-grow: 0.5;
    color: ${theme.color.SecondaryColor.BasicFont};
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
  height: 27px;
  padding: 5px 90px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: ${theme.fontWeight.Regular};
`;

export default CalendarComponent;
