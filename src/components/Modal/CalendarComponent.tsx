import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface CalendarComponentProps {
  onSelectDate: (date: Date | Date[] | null) => void;
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({ onSelectDate }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date: Date | Date[] | null) => {
    setSelectedDate(date instanceof Date ? date : null);
    onSelectDate(date instanceof Date ? date : null);
  };
  

  return (
    <div>
      <Calendar onChange={handleDateChange} value={selectedDate} />
    </div>
  );
};

export default CalendarComponent;
