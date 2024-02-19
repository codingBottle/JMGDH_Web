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
  const handlePrevMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setSelectedDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setSelectedDate(newDate);
  };
  return (
    <>
      <CalendarWrapper>
        <RightArrow onClick={handleNextMonth} />
        <LeftArrow onClick={handlePrevMonth} />
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          calendarType="US"
          className="custom-calendar"
          tileContent={({ date }) => {
            return date.getDate();
          }}
        />
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
  height: 331px;

  .react-calendar__navigation__label__labelText,
  .react-calendar__navigation__label__labelText--from {
    flex-grow: 0.5;
  }
  .react-calendar__month-view__days {
    height: 228px;
    width: 218px;
  }
  .react-calendar__tile,
  .react-calendar__month-view__days__day,
  .react-calendar__month-view__days__day--neighboringMonth {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .react-calendar__navigation__label {
    display: flex;
    border: none;
    flex-grow: 0.5;
  }
  .react-calendar__navigation {
    display: flex;
    margin-bottom: 10px;
    width: 260px;
    height: 30px;
    .react-calendar__navigation__arrow,
    react-calendar__navigation__prev2-button {
      display: none;
    }
  }
  abbr {
    display: none;
    font-size: 12px;
  }
  .custom-calendar .react-calendar {
    border: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .custom-calendar .react-calendar__tile {
    border: none;
    font-size: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
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

export default CalendarComponent;
