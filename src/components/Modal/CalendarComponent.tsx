import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface CalendarComponentProps {
  onDateClick: (date: Date | Date[] | null) => void; // 이름 변경: onSelectDate -> onDateClick
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({ onDateClick }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleClick = (value: Date | Date[] | null) => {
    if (value instanceof Date) {
      setSelectedDate(value);
      onDateClick(value);
    } else {
      // Handle the case when date is null
      setSelectedDate(null);
      onDateClick(value);
    }
  };

  return (
    <div>
      <Calendar onChange={handleClick} value={selectedDate instanceof Date ? selectedDate : null} />
    </div>
  );
};

export default CalendarComponent;
