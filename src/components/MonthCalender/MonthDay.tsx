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
    <ModalContainer style={{ backgroundColor: `#${scheduleData.colorCode} ` }}>
      <p style={{ color: "black" }}>{scheduleData.title}</p>
    </ModalContainer>
  );
};
export default ModalDay;

const ModalContainer = styled.div`
  width: 80%;
  height: 30px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 3px;
  padding: 6px, 12px;
  border-radius: 4px;
  gap: 10px;
  display: flex;
  p {
    margin-top: 4px;
    margin-left: 8px;
  }
`;
