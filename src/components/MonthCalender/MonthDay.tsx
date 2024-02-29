import React, { useState } from "react";
import styled from "styled-components";

import SchduleEdit from "../Modal/SchduleEdit";
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
interface ModalDayProps {
  scheduleData: Schedule[];
  onClick?: (schedule: Schedule) => void;
}
const ModalDay: React.FC<ModalDayProps> = ({ scheduleData, onClick }) => {
  const handleScheduleClick = (
    schedule: Schedule,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    event.stopPropagation();
    if (onClick) {
      onClick(schedule);
    }
  };

  if (!scheduleData || scheduleData.length === 0) {
    return null;
  }

  return (
    <div>
      {scheduleData.map((schedule, index) => (
        <ModalContainer
          key={schedule.id}
          style={{ backgroundColor: `#${schedule.colorCode}` }}
          onClick={(event) => handleScheduleClick(schedule, event)}>
          <p style={{ color: "black" }}>{schedule.title}</p>
        </ModalContainer>
      ))}
    </div>
  );
};
export default ModalDay;

const ModalContainer = styled.div`
  width: 80%;
  height: 30px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 3px;
  padding: 6px 12px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  p {
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
