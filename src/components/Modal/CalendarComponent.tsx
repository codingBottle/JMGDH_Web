import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";

interface CalendarComponentProps {
  onDateClick: (date: Date | Date[] | null) => void;
}
interface StyledCalendarProps {
  onChange?: (
    value: Date | Date[] | null,
    event: React.ChangeEvent<any>
  ) => void;
}

const StyledContainer = styled.div`
  .your-container-class {
    display: inline-block;
  }

  .your-container-class.exclude-styling {
    all: initial;
  }
  div {
    display: block;
  }
`;

const StyledCalendar = styled(Calendar)`
  width: 250px;
  height: 329px;

  .your-container-class {
    /* your-container-class에 대한 스타일 정의 */
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 250px;
  }

  .your-container-class.exclude-styling {
    /* exclude-styling에 대한 스타일 정의 */
    width: 250px;
  }

  .react-calendar__navigation {
    width: 250px;

    display: flex;
    justify-content: space-between;
  }

  .react-calendar__month-view {
    width: 250px;
  }

  .react-calendar__viewContainer {
    width: 250px;
  }

  /* 나머지 CSS 코드 */
  /* react-calendar 라이브러리에서 제공하는 클래스에 스타일을 추가할 수 있습니다. */
  .react-calendar__tile {
    /* 버튼 스타일 */
    flex: 0 0 14.2857%;
    overflow: hidden;
    margin-inline-end: 0px;
    /* 다른 스타일 추가 */
  }

  .react-calendar__tile--now {
    /* 현재 날짜 스타일 */
    /* 다른 스타일 추가 */
  }

  /* 필요한 다른 클래스에 대한 스타일을 추가할 수 있습니다. */
  .react-calendar__month-view__weekdays {
    div {
      width: 250px;
    }
  }
  .react-calendar__month-view__days {
    div {
      width: 250px;
    }
  }
`;
const CalendarComponent: React.FC<CalendarComponentProps> = ({
  onDateClick,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleClick = (
    value: Date | Date[] | null,
    event: React.ChangeEvent<any>
  ) => {
    if (value instanceof Date) {
      setSelectedDate(value);
      onDateClick(value);
    } else {
      setSelectedDate(null);
      onDateClick(value);
    }
  };

  return (
    <div>
      <StyledContainer>
        <StyledCalendar
          className="your-container-class"
          onChange={handleClick}
          value={selectedDate instanceof Date ? selectedDate : null}
        />
      </StyledContainer>
      {selectedDate !== null && (
        <div>
          <p>선택한 날짜: {selectedDate.toLocaleDateString()}</p>
        </div>
      )}
    </div>
  );
};

export default CalendarComponent;
