import React, { useState } from "react";
import styled from "styled-components";

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
  onScheduleClick?: (schedule: Schedule) => void;
}
const ModalDay: React.FC<ModalDayProps> = ({
  scheduleData,
  onScheduleClick,
}) => {
  return (
    <div>
      {scheduleData.map((schedule) => (
        <ModalContainer
          key={schedule.id}
          style={{ backgroundColor: `#${schedule.colorCode}` }}
          onClick={() => onScheduleClick && onScheduleClick(schedule)}>
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
