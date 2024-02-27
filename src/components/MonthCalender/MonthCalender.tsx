import React, { useState, useEffect } from "react";
import styled from "styled-components";
import theme from "@/theme/theme";
import axios from "axios";
import MonthDay from "./MonthDay";
import ScheduleAdd from "../Modal/ScheduleAdd";

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

interface MonthCalendarProps {
  today: any;
}
const MonthCalendar: React.FC<MonthCalendarProps> = ({ today }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  const onClickDay = (currentDay: number) => {
    setModalOpen(true);
    setSelectedDay(currentDay);
  };

  useEffect(() => {
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const fetchData = async () => {
      const endpoint = `https://calendars2.duckdns.org/schedules/year/${year}/month/${month}`;

      try {
        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        setSchedules(response.data?.data.schedules || []);
        console.log("월별 캘린더 조회성공:", response.data?.data.schedules);
      } catch (error) {
        console.error("월별 캘린더 오류:", error);
      }
    };

    fetchData();
  }, [today]);

  const handleClose = () => {
    setModalOpen(false);
  };

  const getSchedulesForDay = (currentDay: number): Schedule[] => {
    return schedules.filter(
      (schedule) =>
        new Date(schedule.startDate).getDate() === currentDay ||
        new Date(schedule.endDate).getDate() === currentDay
    );
  };

  const renderCalendar = (): JSX.Element[] => {
    const year = today.getFullYear();
    const month = today.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfWeek = new Date(year, month, 1).getDay();
    const totalCells = 7 * Math.ceil((firstDayOfWeek + daysInMonth) / 7);
    let day = 1;
    const calendarDays: JSX.Element[] = [];

    for (let i = 0; i < totalCells; i++) {
      if (i < firstDayOfWeek) {
        calendarDays.push(<td key={`day-${i}`}></td>);
      } else if (day <= daysInMonth) {
        const currentDay = day;
        const daySchedules = getSchedulesForDay(currentDay);
        calendarDays.push(
          <td key={`day-${i}`} onClick={() => onClickDay(currentDay)}>
            <span>{day}</span>
            <MonthDay scheduleData={daySchedules} />
          </td>
        );
        day++;
      } else {
        calendarDays.push(<td key={`day-${i}`}></td>);
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
      {modalOpen && (
        <Modal>
          <ScheduleAdd onClose={handleClose} selectedDay={selectedDay} />
        </Modal>
      )}
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

  pointer-events: none;

  > * {
    pointer-events: auto;
  }
`;
