import React from "react";
import styled from "styled-components";
import theme from "@/theme/theme";

interface ModalDayProps {
  scheduleData:
    | {
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
    | undefined; // undefined 허용
}
const ModalDay: React.FC<ModalDayProps> = ({ scheduleData }) => {
  if (!scheduleData) {
    // scheduleData가 undefined인 경우에 대한 처리 (예: 빈 화면, 에러 메시지 등)
    return null;
  }
  console.log("작동합니다.", scheduleData);
  return (
    <ModalContainer>
      <p>Title: {scheduleData.title}</p>
      <p>Start Date: {scheduleData.startDate}</p>
      <p>End Date: {scheduleData.endDate}</p>
      <p>All Day: {scheduleData.allDay ? "Yes" : "No"}</p>
      <p>Color Code: {scheduleData.colorCode}</p>
      <p>Time of Start: {scheduleData.timeOfStartDate}</p>
      <p>Time of End: {scheduleData.timeOfEndDateTime}</p>
      <p>Repeat: {scheduleData.repeat ? "Yes" : "No"}</p>
    </ModalContainer>
  );
};
export default ModalDay;

const ModalContainer = styled.div`
  background-color: ${theme.color.PrimaryColor.PrimaryWhite};
  border: 1px solid ${theme.color.SecondaryColor.ButtonBorder};
  padding: 20px;
  border-radius: 8px;
`;
