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
const ScheduleAdd: React.FC<ScheduleAddProps> = ({ onClose, schedule }) => {
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
      <Input
        type="text"
        placeholder="일정명을 적어주세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <DatePickerContainer>
        <div className="datepicker-div">
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
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
            wrapperClassName="datepicker-input-container"
          />
        </div>
        <div className="datepicker-div">
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
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
          <div>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="시간"
              dateFormat="hh:mm aa"
              locale="ko"
              wrapperClassName="datepicker-input-container"
            />
          </div>
          <div>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="시간"
              dateFormat="hh:mm aa"
              locale="ko"
              wrapperClassName="datepicker-input-container"
            />
          </div>
        </div>
      </DatePickerContainer>

      <div className="colors">
        <ColorsContainer>
          <svg
            className="pointers"
            width="25"
            height="26"
            viewBox="0 0 25 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M19.6828 20.3936C20.9938 20.3936 22.0648 19.3076 22.0648 17.9786C22.0648 16.3736 19.6828 13.7546 19.6828 13.7546C19.6828 13.7546 17.3008 16.3736 17.3008 17.9786C17.3008 19.3076 18.3718 20.3936 19.6828 20.3936ZM8.36978 19.0706C8.58278 19.2836 8.92778 19.2836 9.13778 19.0706L16.8208 11.3906C17.0338 11.1776 17.0338 10.8326 16.8208 10.6226L9.14078 2.9426C9.12278 2.9246 9.10178 2.9066 9.08078 2.8916L6.73478 0.5456C6.68363 0.495108 6.61465 0.466797 6.54278 0.466797C6.47091 0.466797 6.40193 0.495108 6.35078 0.5456L4.91078 1.9856C4.86029 2.03675 4.83198 2.10573 4.83198 2.1776C4.83198 2.24947 4.86029 2.31845 4.91078 2.3696L6.92678 4.3856L0.692781 10.6226C0.479781 10.8356 0.479781 11.1806 0.692781 11.3906L8.36978 19.0706ZM8.75678 5.6126L14.1238 10.9796H3.39278L8.75678 5.6126ZM23.8108 22.5446H0.290781C0.158781 22.5446 0.0507812 22.6526 0.0507812 22.7846V25.1846C0.0507812 25.3166 0.158781 25.4246 0.290781 25.4246H23.8108C23.9428 25.4246 24.0508 25.3166 24.0508 25.1846V22.7846C24.0508 22.6526 23.9428 22.5446 23.8108 22.5446Z"
              fill="black"
            />
          </svg>
          {colorOptions.map((option, index) => (
            <ColorBox
              key={index}
              style={{ backgroundColor: option.fill }}
              onClick={() => handleColorClick(option.code)}
            />
          ))}
        </ColorsContainer>
      </div>
      <CheckboxContainer>
        <CustomCheckbox>
          <input
            type="checkbox"
            id="allDayCheckbox"
            checked={allDay}
            onChange={(e) => setAllDay(e.target.checked)}
            hidden
          />
          <label htmlFor="allDayCheckbox">종일 체크</label>
        </CustomCheckbox>
      </CheckboxContainer>

      <Button onClick={saveSchedule}>저장</Button>
      <Button onClick={onClose}>닫기</Button>
    </Container>
  );
};

export default ScheduleAdd;
const CustomCheckbox = styled.div`
  label {
    position: relative;
    cursor: pointer;
    padding-left: 35px;
    text-align: left;
    color: #000;
    display: inline-block;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 24px;
      height: 24px;
      border: 1px solid #000;
      border-radius: 2px;
      background-color: #fff;
    }
  }

  input[type="checkbox"] {
    opacity: 0;
    position: absolute;
    &:checked + label::before {
      background-color: #ccc;
    }
  }
`;
const ColorsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 80%;
  margin: 20px 0;
  .pointers {
    margin-right: 30px;
  }
`;
const CheckboxContainer = styled.div`
  margin: 20px 0;
  display: flex;
  align-items: center;

  label {
    margin-left: 8px;
  }
`;
const ColorBox = styled.div`
  width: 19px;
  height: 19px;
  border-radius: 4px;
  cursor: pointer;
`;
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
  .datepicker-input-container input {
    width: 60%;
    border: none;
    margin-left: 10px;
    color: #a3a3a3;
  }
  .datepicker-div {
    display: flex;
    width: 100%;
    margin-bottom: 10px;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: ##f8f8f8;
  color: black;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #ececec;
  }
`;
