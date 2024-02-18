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
          className="custom-calendar"
          tileContent={({ date, view }) =>
            view === "month" ? (
              <TileContentWrapper>{date.getDate()}</TileContentWrapper>
            ) : null
          }
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
  padding: 13px;
  width: 254px;
  height: 331px;

  .custom-calendar .react-calendar {
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .custom-calendar .react-calendar__tile {
    border: none;
  }
`;

const TileContentWrapper = styled.span`
  display: inline-block;
  margin-top: 2px;
  margin-bottom: 4px;
`;

const Modal = styled.div`
  position: absolute;
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
  position: absolute;
  background-color: ${theme.color.PrimaryColor.PrimaryWhite};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  padding: 20px;
  z-index: 1;
`;

export default CalendarComponent;
