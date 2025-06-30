import React, { useState } from "react";
import "./Calendar.css";

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [emotionMap, setEmotionMap] = useState({});

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = getDaysInMonth(year, month);

    const calendarCells = [];
    for (let i = 0; i < firstDay; i++) {
      calendarCells.push(<div className="day-cell empty" key={`empty-${i}`} />);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const key = `${year}-${month + 1}-${d}`;
      calendarCells.push(
        <div className="day-cell" key={key}>
          <div className="emoji">{emotionMap[key] || ''}</div>
          <div className="day-number">{d}</div>
        </div>
      );
    }

    return calendarCells;
  };

  const goToPrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <div className="calendar-wrapper">
      <div className="calendar-header">
        <button onClick={goToPrevMonth}>◀</button>
        <div>{currentDate.toLocaleString('default', { month: 'long' }).toUpperCase()} {currentDate.getFullYear()}</div>
        <button onClick={goToNextMonth}>▶</button>
      </div>
      <div className="day-names">
        {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((d) => (
          <div className="day-name" key={d}>{d}</div>
        ))}
      </div>
      <div className="calendar-grid">
        {renderCalendar()}
      </div>
    </div>
  );
}

export default Calendar;