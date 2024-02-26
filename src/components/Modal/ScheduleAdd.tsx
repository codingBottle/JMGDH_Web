import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const ScheduleAdd = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const saveSchedule = async () => {
    if (!title || !startDate || !endDate) {
      alert("모든 정보를 입력해주세요.");
      return;
    }

    const scheduleData = {
      title,
      startDate: startDate.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
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
      <Input
        type="text"
        placeholder="일정명을 적어주세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <DatePickerContainer>
        <div>
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.0908 2.6268H18.0508V0.706797C18.0508 0.574797 17.9428 0.466797 17.8108 0.466797H16.1308C15.9988 0.466797 15.8908 0.574797 15.8908 0.706797V2.6268H8.21078V0.706797C8.21078 0.574797 8.10278 0.466797 7.97078 0.466797H6.29078C6.15878 0.466797 6.05078 0.574797 6.05078 0.706797V2.6268H1.01078C0.479781 2.6268 0.0507812 3.0558 0.0507812 3.5868V23.5068C0.0507812 24.0378 0.479781 24.4668 1.01078 24.4668H23.0908C23.6218 24.4668 24.0508 24.0378 24.0508 23.5068V3.5868C24.0508 3.0558 23.6218 2.6268 23.0908 2.6268ZM21.8908 22.3068H2.21078V10.9068H21.8908V22.3068ZM2.21078 8.8668V4.7868H6.05078V6.2268C6.05078 6.3588 6.15878 6.4668 6.29078 6.4668H7.97078C8.10278 6.4668 8.21078 6.3588 8.21078 6.2268V4.7868H15.8908V6.2268C15.8908 6.3588 15.9988 6.4668 16.1308 6.4668H17.8108C17.9428 6.4668 18.0508 6.3588 18.0508 6.2268V4.7868H21.8908V8.8668H2.21078Z"
              fill="black"
              fill-opacity="0.85"
            />
          </svg>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy-MM-dd"
          />{" "}
        </div>
        <div>
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_966_3968)">
              <path
                d="M12.0508 0.466797C5.424 0.466797 0.0507812 5.84001 0.0507812 12.4668C0.0507812 19.0936 5.424 24.4668 12.0508 24.4668C18.6776 24.4668 24.0508 19.0936 24.0508 12.4668C24.0508 5.84001 18.6776 0.466797 12.0508 0.466797ZM12.0508 22.4311C6.549 22.4311 2.0865 17.9686 2.0865 12.4668C2.0865 6.96501 6.549 2.50251 12.0508 2.50251C17.5526 2.50251 22.0151 6.96501 22.0151 12.4668C22.0151 17.9686 17.5526 22.4311 12.0508 22.4311Z"
                fill="black"
                fill-opacity="0.85"
              />
              <path
                d="M16.7305 15.8554L12.9108 13.0938V6.46429C12.9108 6.34643 12.8144 6.25 12.6965 6.25H11.4081C11.2903 6.25 11.1938 6.34643 11.1938 6.46429V13.8411C11.1938 13.9107 11.226 13.975 11.2822 14.0152L15.7126 17.2455C15.809 17.3152 15.943 17.2938 16.0126 17.2L16.7787 16.1554C16.8483 16.0563 16.8269 15.9223 16.7305 15.8554Z"
                fill="black"
                fill-opacity="0.85"
              />
            </g>
            <defs>
              <clipPath id="clip0_966_3968">
                <rect
                  width="24"
                  height="24"
                  fill="white"
                  transform="translate(0.0507812 0.466797)"
                />
              </clipPath>
            </defs>
          </svg>

          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="yyyy-MM-dd"
          />
        </div>
      </DatePickerContainer>
      <Button onClick={saveSchedule}>저장</Button>
      <Button onClick={onClose}>닫기</Button>
    </Container>
  );
};

export default ScheduleAdd;

const Container = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 41px 50px;
  gap: 10px;
  width: 480px;
  height: 600px;
  border-radius: 20px;
  border: 0.5px;
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
`;

const Input = styled.input`
  padding: 10px;
  border: none;
  border-bottom: 1px solid #ccc;
  border-radius: 0;
  margin-bottom: 38px;
`;

const DatePickerContainer = styled.div`
  gap: 10px;
  width: 100%;
  .react-datepicker-wrapper {
    flex-grow: 1;
  }
  input {
    width: 60%;
    margin-left: 10px;
  }
  div {
    display: flex;
    width: 100%;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;
