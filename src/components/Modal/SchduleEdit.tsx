import React, { useState } from "react";
import styled from "styled-components";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import ko from "date-fns/locale/ko";
import { format } from "date-fns";
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

interface ScheduleAddProps {
  onClose: () => void;
  schedule?: Schedule;
}
const ScheduleEdit: React.FC<ScheduleAddProps> = ({ onClose, schedule }) => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [colorCode, setColorCode] = useState("EFE1E1");
  const [allDay, setAllDay] = useState(false);

  const handleAllDayChange = (e: {
    target: { checked: boolean | ((prevState: boolean) => boolean) };
  }) => {
    setAllDay(e.target.checked);
  };

  const colorOptions = [
    { fill: "#EFE1E1", code: "EFE1E1" },
    { fill: "#F3F0E1", code: "F3F0E1" },
    { fill: "#EBF4E0", code: "EBF4E0" },
    { fill: "#EEEEEE", code: "EEEEEE" },
    { fill: "#F3FFDF", code: "F3FFDF" },
  ];
  const handleColorClick = (code: React.SetStateAction<string>) => {
    setColorCode(code);
  };

  const saveSchedule = async () => {
    if (!title || !startDate || !endDate) {
      alert("모든 정보를 입력해주세요.");
      return;
    }

    const timeOfStartDate = format(startDate, "HH:mm");
    const timeOfEndDate = format(endDate, "HH:mm");

    const scheduleData = {
      title,
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(endDate, "yyyy-MM-dd"),
      isAllDay: allDay,
      timeOfStartDate: allDay ? undefined : timeOfStartDate,
      timeOfEndDate: allDay ? undefined : timeOfEndDate,
      colorCode,
    };

    try {
      const response = await axios.post(
        "https://calendars2.duckdns.org/schedules",
        scheduleData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log(response.data);
      alert("일정이 추가되었습니다.");
      onClose();
    } catch (error) {
      console.error("일정 추가 실패:", error);
      alert("일정 추가에 실패하였습니다.");
    }
  };
  return (
    <Container>
      <span>일정만들기</span>
    </Container>
  );
};

export default ScheduleEdit;

const Container = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 41px 50px;
  gap: 10px;
  width: 480px;
  height: 600px;
  border-radius: 20px;

  border: solid black 1px;
  span {
    text-align: center;
    color: #1890ff;
    font-family: Noto Sans KR;
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0em;
    margin-bottom: 50px;
  }
  .colors {
    margin-top: 30px;
    display: flex;
    text-align: center;
    svg {
      display: flex;
      text-align: center;
    }
  }
`;
