import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import theme from "@/theme/theme";
import axios from "axios";
import { RightArrow, LeftArrow } from "@/assets/icon/Arrow";
interface Schedule {
  id: number;
  title: string;
  colorCode: string;
  startDate: string;
  endDate: string;
  timeOfStartDate: string;
  timeOfEndDateTime: string;
  allDay: boolean;
  repeat: boolean;
}

export default function DailyCalender() {
  const [date, setDate] = useState(new Date());
  const [day, setDay] = useState(date.getDate());
  const [month, setMonth] = useState(date.getMonth() + 1);
  const [year, setYear] = useState(date.getFullYear());
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      const endpoint = `https://calendars2.duckdns.org/schedules/year/${year}/month/${month}/day/${day}`;

      try {
        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setSchedules(response.data.data.schedules);
        console.log("스케줄 조회 성공:", response.data.data.schedules);
      } catch (error) {
        console.error("스케줄 조회 오류:", error);
      }
    };

    fetchSchedule();
  }, [year, month, day]); // year, month, day가 변경될 때마다 요청을 다시 보냅니다.

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragStart !== null) {
      const delta = e.clientX - dragStart;
      if (containerRef.current) {
        containerRef.current.scrollLeft = scrollLeft - delta;
      }
    }
  };

  const handleMouseUp = () => {
    setDragStart(null);
    if (containerRef.current) {
      setScrollLeft(containerRef.current.scrollLeft);
    }
  };

  const numbers = Array.from({ length: 24 }, (_, index) => index);

  const handlePrevClick = () => {
    date.setDate(day - 1);
    setDate(date);
    setDay(date.getDate());
    setMonth(date.getMonth() + 1);
    setYear(date.getFullYear());
  };

  const handleNextClick = () => {
    date.setDate(day + 1);
    setDate(date);
    setDay(date.getDate());
    setMonth(date.getMonth() + 1);
    setYear(date.getFullYear());
    console.log(date);
  };

  return (
    <DailyCalenderContenter>
      <Daily>
        <div className="Top">
          <p className="day">
            {month}/{day}
          </p>
          <p>,{year}</p>
        </div>

        <div className="Bottom">
          <p className="daily">Daily</p>
          <RightArrow onClick={() => handlePrevClick()} />
          <LeftArrow onClick={() => handleNextClick()} />
        </div>
      </Daily>

      <Contents
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        ref={containerRef}
      >
        <div className="linediv">
          {numbers.map((hour) => {
            // 시간대별 일정 찾기
            const currentSchedules = schedules.filter((schedule) => {
              const scheduleHour = parseInt(
                schedule.timeOfStartDate.split(":")[0],
                10
              );
              return scheduleHour === hour;
            });

            return (
              <div key={hour} className="timeSlot">
                <div className="hourLabel">{`${hour}`}</div>

                {currentSchedules.map((schedule, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor: `#${schedule.colorCode}`,
                      color: "black",
                      padding: "5px",
                      margin: "5px 0",
                      width: "90%",
                    }}
                  >
                    <strong>{schedule.title}</strong>
                  </div>
                ))}

                <div className="line"></div>
              </div>
            );
          })}
        </div>
      </Contents>
    </DailyCalenderContenter>
  );
}

const DailyCalenderContenter = styled.div`
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
  overflow: hidden;
  width: 100%;
  height: 100%;
  border: 1px solid ${theme.color.SecondaryColor.ButtonBorder};
  background-color: #ffffff;
`;

const Daily = styled.div`
  width: 100%;
  .Top {
    display: flex;
    width: auto;
    margin: 38px 0px 0px 21px;
    justify-content: left;

    p {
      font-size: 10px;
      font-weight: ${theme.fontWeight.bold};
    }
    .day {
      color: ${theme.color.AccentColor.SaturdayColor};
    }
  }
  .daily {
    font-size: 18px;
    font-weight: ${theme.fontWeight.Regular};
  }
  .Bottom {
    display: flex;
    width: 100%;
    margin: 0px 0px 0px 21px;
    justify-content: left;
    align-items: center;

    p {
      margin-right: 13px;
      font-size: 18px;
      font-weight: ${theme.fontWeight.Regular};
    }
    svg {
      margin-right: 1px;
      cursor: pointer;
    }
  }
`;
const Contents = styled.div`
  overflow: auto;
  margin-top: 22px;
  font-size: 0.625rem;
  cursor: pointer;
  font-weight: ${theme.fontWeight.Regular};
  width: 100%;

  .linediv {
    display: flex;
    flex-direction: row;
    width: 100%;
  }

  .timeSlot {
    flex: 1;
    min-width: 60px;
    height: 280px;
    border-right: 1px solid ${theme.color.SecondaryColor.ButtonBorder};
    position: relative;
  }

  .line {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 1px;
    background-color: ${theme.color.SecondaryColor.ButtonBorder};
  }
`;
