import React, { useState, useEffect } from "react";
import styled from "styled-components";
import theme from "@/theme/theme";
import axios from "axios";
import MonthDay from "./MonthDay";

interface Schedule {
  allDay: boolean;
  colorCode: string;
  endDate: string;
  id: number;
  repeat: boolean;
  startDate: string;
  timeOfEndDateTime: string;
  timeOfStartDate: string;
  title: string;
}

const MonthCalendar: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  const onClickDay = (currentDay: number) => {
    if (modalOpen === true) {
      setModalOpen(false);
    } else {
      setModalOpen(true);
      setSelectedDay(currentDay);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const endpoint = `https://calendars2.duckdns.org/schedules/year/2024/month/2`;

      try {
        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        setSchedules(response.data?.data.schedules || []);
        console.log(response.data?.data.schedules || []);
      } catch (error) {
        console.error("월별 캘린더 오류:", error);
      }
    };

    fetchData();
  }, []);

  const renderCalendar = (): JSX.Element[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = getDaysInMonth(year, month);

    const firstDayOfWeek = new Date(year, month, 1).getDay();

    const calendarDays: JSX.Element[] = [];

    const prevMonth = month === 0 ? 11 : month - 1;
    const prevMonthYear = month === 0 ? year - 1 : year;
    const daysInPrevMonth = getDaysInMonth(prevMonthYear, prevMonth);

    const totalCells = 7 * Math.ceil((firstDayOfWeek + daysInMonth) / 7);

    let day = 1;

    const getScheduleForDay = (currentDay: number): Schedule | undefined => {
      return schedules.find(
        (schedule) =>
          new Date(schedule.startDate).getDate() === currentDay ||
          new Date(schedule.endDate).getDate() === currentDay
      );
    };

    for (let i = 0; i < totalCells; i++) {
      if (i < firstDayOfWeek) {
        calendarDays.push(
          <td key={`day-${i}`}>
            <span>{daysInPrevMonth - (firstDayOfWeek - i) + 1}</span>
          </td>
        );
      } else if (day <= daysInMonth) {
        const currentDay = day;

        calendarDays.push(
          <td key={`day-${i}`} onClick={() => onClickDay(currentDay)}>
            <span>{day}</span>
            {modalOpen === true && selectedDay === currentDay && (
              <Modal>
                <MonthDay scheduleData={getScheduleForDay(currentDay)} />
              </Modal>
            )}
          </td>
        );
        day++;
      } else {
        calendarDays.push(
          <td key={`day-${i}`} className="next-month-day">
            <span>{i - (firstDayOfWeek + daysInMonth) + 1}</span>
          </td>
        );
      }
    }

    const weeks: JSX.Element[] = [];
    let week: JSX.Element[] = [];

    calendarDays.forEach((cell, index) => {
      week.push(cell);

      if ((index + 1) % 7 === 0) {
        weeks.push(<tr key={`week-${index / 7}`}>{week}</tr>);
        week = [];
      }
    });

    return weeks;
  };

  return (
    <CalendarWrapper>
      <Calendar>
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>{renderCalendar()}</tbody>
      </Calendar>
    </CalendarWrapper>
  );
};

export default MonthCalendar;

const CalendarWrapper = styled.div`
  width: 100%;
  height: 100%;
  color: ${theme.color.SecondaryColor.BasicFont};
  background-color: ${theme.color.PrimaryColor.PrimaryWhite};
`;

const Calendar = styled.table`
  width: 100%;
  height: 100%;
  border-collapse: collapse;

  th,
  td {
    border: 0.5px solid ${theme.color.SecondaryColor.ButtonBorder};
    font-size: 14px;
    font-weight: ${theme.fontWeight.Regular};

    &:first-child {
      color: ${theme.color.AccentColor.SundayColor};
    }
    &:last-child {
      color: ${theme.color.AccentColor.SaturdayColor};
    }
  }

  thead {
    width: 100%;
    tr {
      display: flex;
      flex-direction: row;
      th {
        flex: 1;
        text-align: left;
        height: 38px;
        line-height: 38px;
        padding-left: 10px;
      }
    }
  }

  tbody {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    tr {
      display: flex;
      flex-direction: row;
      flex: 1;
      td {
        flex: 1;
        padding-top: 10px;
        padding-left: 10px;
        cursor: pointer;
      }
      .prev-month-day,
      .next-month-day {
        background-color: ${theme.color.SecondaryColor.Border};
        span {
          opacity: 0.5;
        }
      }
    }
  }
`;

const Modal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 100;
`;
