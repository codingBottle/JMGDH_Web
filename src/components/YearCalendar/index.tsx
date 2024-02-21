import React, { useState } from "react";
import theme from "@/theme/theme";
import styled from "styled-components";
import Calendar from "react-calendar";
import moment from "moment";

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
          <Calendar
            value={new Date(selectedDate.getFullYear(), monthIndex, 1)}
            onChange={handleDateChange}
            calendarType="US"
            locale="en-EN"
            formatDay={(locale, date) =>
              date.toLocaleString("en", { day: "numeric" })
            }
            nextLabel={null}
            prevLabel={null}
            next2Label={null}
            prev2Label={null}
          />
        </MonthBox>
      ))}
      {showModal && (
        <Modal>
          <ModalTop>
            <div>{moment(selectedDate).format("DD")}</div>
            <button onClick={closeModal}>CLOSE</button>
          </ModalTop>
          <ModalContent>
            <p>할 일</p>
            <p>TODO</p>
            <p>내용내용내용</p>
            <p>배고프다</p>
          </ModalContent>
        </Modal>
      )}
      <div>
        임시(추후 삭제 ㄱㄱ) : {moment(selectedDate).format("YYYY년 MM월 DD일")}
      </div>
    </CalendarWrapper>
  );
};

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
  /* background-color: rgba(0, 0, 0, 0.1); */

  h1 {
    margin: 0;
    padding: 0;
    font-size: 30px;
    font-weight: ${theme.fontWeight.Medium};
  }

  /* n년 n월 생략 */
  .react-calendar__navigation {
    display: none;
  }

  abbr {
    font-size: 16px;
    text-decoration: none;
  }

  /* 요일 배치 중앙 */
  .react-calendar__month-view__weekdays__weekday {
    text-align: center;
    margin-bottom: 10px;
  }

  /* 일자 */
  .react-calendar__tile {
    display: inline-block;
    position: relative;
    width: 30px;
    height: 38px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    &:hover {
      background-color: ${theme.color.AccentColor.DayFill_Click};
      border-radius: 20px;
    }
    &:focus {
      background-color: ${theme.color.AccentColor.DayFill_Click};
      border: 1px solid rgba(0, 0, 0, 0.6);
      border-radius: 20px;
    }
  }

  /* 오늘 날짜 */
  .react-calendar__tile--now {
    background-color: ${theme.color.AccentColor.TodayFill};
    color: ${theme.color.PrimaryColor.PrimaryWhite};
    border-radius: 20px;
    &:hover {
      /* TodayFill_Click */
      background-color: #4e8fd7;
    }
    &:focus {
      background-color: ${theme.color.AccentColor.TodayFill};
      border: 1px solid rgba(0, 0, 0, 0.6);
    }
  }

  /* 저번 달 & 다음 달 일자 */
  .react-calendar__month-view__days__day--neighboringMonth {
    color: ${theme.color.GrayScale.Gray300};
    &:hover {
      background-color: transparent;
    }
  }
`;

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 240px;
  padding: 20px;
  background-color: #f8f8f8;
  border: 0.5px solid rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  box-shadow: -4px 4px 4px rgba(0, 0, 0, 0.1);

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
`;

const ModalTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  div {
    width: 24px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    color: ${theme.color.PrimaryColor.PrimaryWhite};
    background-color: ${theme.color.AccentColor.TodayFill};
    border-radius: 20px;
    font-size: 12px;
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
    background-color: #fce3e3;
    font-size: 12px;
    border-radius: 4px;
  }
`;

export default YearCalendar;