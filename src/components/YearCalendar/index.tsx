import React, { useState } from 'react';
import theme from "@/theme/theme";
import styled from "styled-components";
import Calendar from 'react-calendar';
import moment from 'moment';

const YearCalendar = () => {
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
    <CalendarWrapper>
      {[...Array(12)].map((_, monthIndex) => (
        <MonthBox key={monthIndex}>
          <h1>{monthIndex + 1}</h1>
          <div className='year-calendar'>
            <Calendar
              value={new Date(selectedDate.getFullYear(), monthIndex, 1)}
              onChange={handleDateChange}
              calendarType="US"
              locale='en-EN'
              formatDay={(locale, date) =>
                date.toLocaleString('en', { day: 'numeric' })
              }
              nextLabel={null}
              prevLabel={null}
              next2Label={null}
              prev2Label={null}
            />
          </div>
        </MonthBox>
      ))}
      {showModal && (
        <Modal>
          <ModalTop>
            <div>
              <p className='day'>{moment(selectedDate).format("DD")}</p>
              <p>{moment(selectedDate).format("ddd")}</p>
            </div>
            <button onClick={closeModal}>x</button>
          </ModalTop>
          <ModalContent>
            <p>할 일</p>
            <p>TODO</p>
            <p>내용내용내용</p>
            <p>배고프다</p>
            <p>할 일</p>
            <p>TODO</p>
            <p>내용내용내용</p>
            <p>배고프다</p>
          </ModalContent>
        </Modal>
      )}
    </CalendarWrapper>
  )
}

const CalendarWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 30px;
  width: 100%;
  margin: 0;
  padding: 75px 74px;
  color: ${theme.color.SecondaryColor.BasicFont};
  background-color: ${theme.color.PrimaryColor.PrimaryWhite};
`;

const MonthBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 30px;
  width: 282px;
  height: 341px;
  margin: 0;
  padding: 6px;

  .year-calendar {
    position: relative;
    margin: 0;
    padding: 0;
  }

  h1 {
    margin: 0;
    padding: 0;
    font-size: 30px;
    font-weight: ${theme.fontWeight.Medium};
  }

  .react-calendar__navigation {
    display: none;
  }

  abbr {
    font-size: 16px;
    text-decoration: none;
  }

  .react-calendar__month-view__weekdays__weekday {
    text-align: center;
    margin-bottom: 10px;
  }

  .react-calendar__tile {
    display: inline-block;
    width: 30px;
    height: 38px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    &:hover {
      background-color: ${theme.color.HoverEventColor.EventfillHover};
      border-radius: 20px;
    }
    &:focus {
      color: ${theme.color.AccentColor.TodayFont};
      background-color: ${theme.color.AccentColor.DayFill_Click};
      border-radius: 20px;
    }
  }

  .react-calendar__tile--now{
    background-color: ${theme.color.AccentColor.TodayFill};
    color: ${theme.color.PrimaryColor.PrimaryWhite} !important;
    border-radius: 20px;
    &:hover {
      background-color: #6BA7E9 !important;
    }
    &:focus {
      background-color: #4E8FD7 !important;
      &:hover {
        background-color: #3978BD !important;
      }
    }
  }

  .react-calendar__month-view__days__day--neighboringMonth{
    color: ${theme.color.GrayScale.Gray300};
    pointer-events: none;   
    &:hover {
      background-color: transparent;
      cursor: auto;
    }
  }
`;

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  position: fixed;
  top: 50%;
  left: 5%;
  transform: translate(-5%, -50%);
  width: 240px;
  padding: 20px;
  background-color: #F8F8F8;
  border: 0.5px solid rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  box-shadow: -4px 4px 4px rgba(0, 0, 0, 0.1);
  
  button {
    color: rgba(0, 0, 0, 0.2);
    background-color: transparent;
    border: none;
    font-size: 24px;
    cursor: pointer;
  }
`;

const ModalTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;

  div {
    display: flex;
    flex-direction: column;
    gap: 10px;
    .day {
      width: 24px;
      height: 24px;
      line-height: 24px;
      text-align: center;
      color: ${theme.color.PrimaryColor.PrimaryWhite};
      background-color: ${theme.color.AccentColor.TodayFill};
      border-radius: 20px;
      font-size: 12px;
    }
  }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  padding: 10px;

  p {
    padding: 6px 12px;
    background-color: #FCE3E3;
    font-size: 12px;
    border-radius: 4px;
  }
`;

export default YearCalendar;
