import React, { useState, useEffect } from "react";
import styled from "styled-components";
import theme from "@/theme/theme";
import CalendarComponent from "./CalendarComponent";
import axios from "axios";

interface ScheduleAddProps {
  onClose: (value: boolean) => void;
}



export default function ScheduleAdd({ onClose }: ScheduleAddProps) {
  const [isEditing, setEditing] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [todayDate, setTodayDate] = useState("");
  const [scheduleTitle, setScheduleTitle] = useState(""); 


  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    setTodayDate(formattedDate);
  }, []);
  const handleEdit = () => {
    setEditing(!isEditing);
    onClose(false);
  };

  const handleCancel = () => {
    setEditing(false);
    
  };
  const handleInputChange = (event: any) => {
    setScheduleTitle(event.target.value); // 입력 값을 상태 변수에 저장
  };
  const handleSave = async () => {
    try {
      // 일정 추가를 위한 데이터 준비
      const scheduleData = {
        title: "코딩보틀 회의", // 여기에 실제 일정명을 받아오는 로직을 추가해야 합니다.
        startDate: "2024-02-24",
        endDate: "2024-02-24",
        isAllDay: false,
        timeOfStartDate: "15:00",
        timeOfEndDate: "17:00",
        colorCode: "#423ffF",
      };

      // Axios를 사용하여 서버에 일정 추가 요청
      const response = await axios.post(
        "https://calendars2.duckdns.org/schedules",
        scheduleData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // 엑세스 토큰을 헤더에 추가
          },
        }
      );
      onClose(false);
      console.log("Schedule created:", response.data);

      // 일정 추가 후 로직을 원하는 대로 추가할 수 있습니다.

      setEditing(false);
      setSelectedEndDate(new Date(scheduleData.endDate));
    } catch (error) {
      console.error("Error creating schedule:", error);
    }
  };
  const handleDateClick = (date:any) => {
    if (!selectedStartDate) {
      setSelectedStartDate(date);
    } else {
      setSelectedEndDate(date);
    }
  };

  const handleCalendarDateClick = (date: Date | Date[] | null) => {
    // CalendarComponent에서 선택된 날짜를 받아옴
    if (!selectedStartDate || isEditing) {
      setSelectedStartDate(date as Date || todayDate);
    } else {
      setSelectedEndDate(date as Date || todayDate);
    }
    
  };
  function handleModalClose(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    throw new Error("Function not implemented.");

  }
  return (
    <Container>
      <TopBox>
        <p className={`Click ${isEditing ? "hidden" : ""}`}>일정 추가</p>
      </TopBox>

      <MiddleBox>
        <div className="Mid">
          <input
            type="text"
            placeholder="일정명을 적어주세요"
            onChange={handleInputChange}
          />
        </div>
        <div
          className="box"
          onClick={() => {
            handleDateClick(todayDate);

            handleEdit();
          }}
        >
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.54 2.7225H18.5V0.8025C18.5 0.6705 18.392 0.5625 18.26 0.5625H16.58C16.448 0.5625 16.34 0.6705 16.34 0.8025V2.7225H8.66V0.8025C8.66 0.6705 8.552 0.5625 8.42 0.5625H6.74C6.608 0.5625 6.5 0.6705 6.5 0.8025V2.7225H1.46C0.929 2.7225 0.5 3.1515 0.5 3.6825V23.6025C0.5 24.1335 0.929 24.5625 1.46 24.5625H23.54C24.071 24.5625 24.5 24.1335 24.5 23.6025V3.6825C24.5 3.1515 24.071 2.7225 23.54 2.7225ZM22.34 22.4025H2.66V11.0025H22.34V22.4025ZM2.66 8.9625V4.8825H6.5V6.3225C6.5 6.4545 6.608 6.5625 6.74 6.5625H8.42C8.552 6.5625 8.66 6.4545 8.66 6.3225V4.8825H16.34V6.3225C16.34 6.4545 16.448 6.5625 16.58 6.5625H18.26C18.392 6.5625 18.5 6.4545 18.5 6.3225V4.8825H22.34V8.9625H2.66Z"
              fill="black"
              fill-opacity="0.85"
            />
          </svg>
          <p>{selectedStartDate instanceof Date ? selectedStartDate.toLocaleDateString() : new Date(todayDate).toLocaleDateString()}</p>

        </div>
        {isEditing && (
          <CalendarComponent
  
            onDateClick={handleCalendarDateClick}
          />
        )}
        <div className="box" onClick={() => handleDateClick(selectedEndDate)}>
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_910_10655)">
              <path
                d="M12.5 0.5625C5.87321 0.5625 0.5 5.93571 0.5 12.5625C0.5 19.1893 5.87321 24.5625 12.5 24.5625C19.1268 24.5625 24.5 19.1893 24.5 12.5625C24.5 5.93571 19.1268 0.5625 12.5 0.5625ZM12.5 22.5268C6.99821 22.5268 2.53571 18.0643 2.53571 12.5625C2.53571 7.06071 6.99821 2.59821 12.5 2.59821C18.0018 2.59821 22.4643 7.06071 22.4643 12.5625C22.4643 18.0643 18.0018 22.5268 12.5 22.5268Z"
                fill="black"
                fill-opacity="0.85"
              />
              <path
                d="M17.1797 15.9511L13.36 13.1895V6.55999C13.36 6.44213 13.2636 6.3457 13.1457 6.3457H11.8574C11.7395 6.3457 11.6431 6.44213 11.6431 6.55999V13.9368C11.6431 14.0064 11.6752 14.0707 11.7315 14.1109L16.1618 17.3412C16.2582 17.4109 16.3922 17.3895 16.4618 17.2957L17.2279 16.2511C17.2975 16.152 17.2761 16.018 17.1797 15.9511Z"
                fill="black"
                fill-opacity="0.85"
              />
            </g>
            <defs>
              <clipPath id="clip0_910_10655">
                <rect
                  width="24"
                  height="24"
                  fill="white"
                  transform="translate(0.5 0.5625)"
                />
              </clipPath>
            </defs>
          </svg>
          <p>{selectedEndDate ? selectedEndDate.toLocaleDateString() : 'No date selected'}</p>

        </div>

        <div className="box">
          <svg
            width="25"
            height="26"
            viewBox="0 0 25 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.132 20.4893C21.443 20.4893 22.514 19.4033 22.514 18.0743C22.514 16.4693 20.132 13.8503 20.132 13.8503C20.132 13.8503 17.75 16.4693 17.75 18.0743C17.75 19.4033 18.821 20.4893 20.132 20.4893ZM8.819 19.1663C9.032 19.3793 9.377 19.3793 9.587 19.1663L17.27 11.4863C17.483 11.2733 17.483 10.9283 17.27 10.7183L9.59 3.0383C9.572 3.0203 9.551 3.0023 9.53 2.9873L7.184 0.641303C7.13285 0.590811 7.06387 0.5625 6.992 0.5625C6.92013 0.5625 6.85115 0.590811 6.8 0.641303L5.36 2.0813C5.30951 2.13245 5.2812 2.20143 5.2812 2.2733C5.2812 2.34518 5.30951 2.41416 5.36 2.4653L7.376 4.4813L1.142 10.7183C0.929 10.9313 0.929 11.2763 1.142 11.4863L8.819 19.1663ZM9.206 5.7083L14.573 11.0753H3.842L9.206 5.7083ZM24.26 22.6403H0.74C0.608 22.6403 0.5 22.7483 0.5 22.8803V25.2803C0.5 25.4123 0.608 25.5203 0.74 25.5203H24.26C24.392 25.5203 24.5 25.4123 24.5 25.2803V22.8803C24.5 22.7483 24.392 22.6403 24.26 22.6403Z"
              fill="#EFE1E1"
            />
          </svg>{" "}
          <div className="box">
            <svg
              width="25"
              height="26"
              viewBox="0 0 25 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.132 20.4893C21.443 20.4893 22.514 19.4033 22.514 18.0743C22.514 16.4693 20.132 13.8503 20.132 13.8503C20.132 13.8503 17.75 16.4693 17.75 18.0743C17.75 19.4033 18.821 20.4893 20.132 20.4893ZM8.819 19.1663C9.032 19.3793 9.377 19.3793 9.587 19.1663L17.27 11.4863C17.483 11.2733 17.483 10.9283 17.27 10.7183L9.59 3.0383C9.572 3.0203 9.551 3.0023 9.53 2.9873L7.184 0.641303C7.13285 0.590811 7.06387 0.5625 6.992 0.5625C6.92013 0.5625 6.85115 0.590811 6.8 0.641303L5.36 2.0813C5.30951 2.13245 5.2812 2.20143 5.2812 2.2733C5.2812 2.34518 5.30951 2.41416 5.36 2.4653L7.376 4.4813L1.142 10.7183C0.929 10.9313 0.929 11.2763 1.142 11.4863L8.819 19.1663ZM9.206 5.7083L14.573 11.0753H3.842L9.206 5.7083ZM24.26 22.6403H0.74C0.608 22.6403 0.5 22.7483 0.5 22.8803V25.2803C0.5 25.4123 0.608 25.5203 0.74 25.5203H24.26C24.392 25.5203 24.5 25.4123 24.5 25.2803V22.8803C24.5 22.7483 24.392 22.6403 24.26 22.6403Z"
                fill="#EFE1E1"
              />
            </svg>
            <div className="coloradd1" />
            <div className="coloradd2" />
            <div className="coloradd3" />
            <div className="coloradd4" />
            <div className="coloradd5" />
            <svg
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_911_4197)">
                <path
                  d="M6.85406 0.0410156C3.54067 0.0410156 0.854065 2.72762 0.854065 6.04102C0.854065 9.35441 3.54067 12.041 6.85406 12.041C10.1675 12.041 12.8541 9.35441 12.8541 6.04102C12.8541 2.72762 10.1675 0.0410156 6.85406 0.0410156ZM6.85406 11.0232C4.10317 11.0232 1.87192 8.79191 1.87192 6.04102C1.87192 3.29012 4.10317 1.05887 6.85406 1.05887C9.60496 1.05887 11.8362 3.29012 11.8362 6.04102C11.8362 8.79191 9.60496 11.0232 6.85406 11.0232Z"
                  fill="black"
                  fill-opacity="0.85"
                />
                <path
                  d="M6.211 3.68387C6.211 3.85437 6.27873 4.01788 6.39929 4.13844C6.51985 4.259 6.68336 4.32673 6.85386 4.32673C7.02435 4.32673 7.18786 4.259 7.30842 4.13844C7.42898 4.01788 7.49671 3.85437 7.49671 3.68387C7.49671 3.51338 7.42898 3.34986 7.30842 3.2293C7.18786 3.10874 7.02435 3.04102 6.85386 3.04102C6.68336 3.04102 6.51985 3.10874 6.39929 3.2293C6.27873 3.34986 6.211 3.51338 6.211 3.68387ZM7.17528 5.18387H6.53243C6.4735 5.18387 6.42528 5.23209 6.42528 5.29102V8.93387C6.42528 8.9928 6.4735 9.04102 6.53243 9.04102H7.17528C7.23421 9.04102 7.28243 8.9928 7.28243 8.93387V5.29102C7.28243 5.23209 7.23421 5.18387 7.17528 5.18387Z"
                  fill="black"
                  fill-opacity="0.85"
                />
              </g>
              <defs>
                <clipPath id="clip0_911_4197">
                  <rect
                    width="12"
                    height="12"
                    fill="white"
                    transform="translate(0.854065 0.0410156)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
          <button
            onClick={handleSave}
            className={isEditing ? "display" : "none"}
          >
            저장
          </button>
          <button
            onClick={handleModalClose}
            className={isEditing ? "" : "hidden"}
          >
            닫기
          </button>
        </div>
      </MiddleBox>
    </Container>
  );
}
const Container = styled.div`
  background-color: #ffffff;
  margin-top: 20px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  border: 0.5px solid #000000;
  width: 480px;
  height: 600px;
  border-radius: 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: auto;
`;
const TopBox = styled.div`
  margin-left: 175px;
  margin-right: 175px;
  margin-bottom: 46.92px;
  width: 130px;

  flex-direction: row;
  align-items: top;
  margin-top: 25px;
  align-items: center;
  p {
    font-family: "NotoSansKR";
    font-style: normal;
    font-weight: ${theme.fontWeight.Regular};
    font-size: 14px;
    line-height: 22px;
  }
  .Click {
    color: ${theme.color.AccentColor.TodayFill};
    margin-right: 32px;
  }
`;

const MiddleBox = styled.div`
  width: 380px;
  height: 280.96px;
  margin-left: 50px;
  margin-right: 50px;

  flex-direction: column;
  margin-top: 20px;
  .box {
    margin-bottom: 38px;
  }
  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 380px;

    input {
      width: 380px;
      height: 32px;
      border-width: 0 0 1px;
      font-family: "NotoSansKR";
      font-style: normal;
      font-weight: ${theme.fontWeight.Regular};
      font-size: 14px;
      line-height: 20px;
      padding-left: 10px;
      margin-bottom: 38px;
    }

    p {
      margin-left: 10px;

      font-family: "NotoSansKR";
      font-style: ${theme.fontWeight.Regular};
      color: ${theme.color.GrayScale.Gray300};
      font-size: 14px;
      line-height: 22px;
    }
  }
  .your-container-class :not(.exclude-styling) {
  }
`;
