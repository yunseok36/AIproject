import { useState } from "react";
import { Link } from "react-router-dom";
import useCalendarStore from "../store/calendarStore";
import "./Calendar.css";

const emotions = ["😄", "😠", "😢", "😌"];

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editMode, setEditMode] = useState(false);

  const { emotionMap, noteMap, setEmotion, saveNote } = useCalendarStore();

  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDate = today.getDate();

  const getDaysInMonth = (year, month) =>
    new Date(year, month + 1, 0).getDate();

  const handlePrev = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    setSelectedDay(null);
  };

  const handleNext = () => {
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    if (
      nextMonth.getFullYear() > todayYear ||
      (nextMonth.getFullYear() === todayYear && nextMonth.getMonth() > todayMonth)
    ) {
      return;
    }
    setCurrentDate(nextMonth);
    setSelectedDay(null);
  };

  const handleSelectDay = (year, month, day) => {
    const isFuture =
      year > todayYear ||
      (year === todayYear && month > todayMonth) ||
      (year === todayYear && month === todayMonth && day > todayDate);

    if (isFuture) return;

    const mm = String(month + 1).padStart(2, "0");
    const dd = String(day).padStart(2, "0");
    const key = `${year}-${mm}-${dd}`;
    setSelectedDay(key);
    setTitle(noteMap[key]?.title || "");
    setContent(noteMap[key]?.content || "");
    setEditMode(false);
  };

  const handleEmotionChange = (emoji) => {
    if (selectedDay) {
      setEmotion(selectedDay, emoji);
    }
  };

  const handleSaveNote = () => {
    saveNote(selectedDay, { title, content });
    setEditMode(false);
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = getDaysInMonth(year, month);

  const cells = [];
  for (let i = 0; i < firstDay; i++) {
    cells.push(<div className="day-cell empty" key={`e-${i}`} />);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const isFuture =
      year > todayYear ||
      (year === todayYear && month > todayMonth) ||
      (year === todayYear && month === todayMonth && d > todayDate);

    const mm = String(month + 1).padStart(2, "0");
    const dd = String(d).padStart(2, "0");
    const key = `${year}-${mm}-${dd}`;
    const isDisabled = isFuture;

    cells.push(
      <div
        key={key}
        className={`day-cell ${emotionMap[key] ? "has-emoji" : ""} ${isDisabled ? "disabled" : ""
          }`}
        onClick={() => handleSelectDay(year, month, d)}
      >
        <div className="emoji">{emotionMap[key]}</div>
        <div className="day-number">{d}</div>
      </div>
    );
  }

  const isNextDisabled =
    (year > todayYear) ||
    (year === todayYear && month >= todayMonth);

  return (
    <div className="calendar-container">
      <div className="section-title">나의 기록</div>
      <div className="calendar-box">
        <div className="calendar-header-fixed">
          <button onClick={handlePrev}>◀</button>
          <div className="month-year">
            {currentDate.toLocaleString("en", { month: "long" }).toUpperCase()}
            <div className="year">{year}</div>
          </div>
          <button onClick={handleNext} disabled={isNextDisabled}>▶</button>
        </div>
        <div className="day-names">
          {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d) => (
            <div key={d} className="day-name">
              {d}
            </div>
          ))}
        </div>
        <div className="calendar-grid">{cells}</div>
      </div>

      {selectedDay && (
        noteMap[selectedDay] && !editMode ? (
          <div className="note-box">
            <div className="note-preview-header">
              <strong className="note-title-preview">{noteMap[selectedDay].title || "제목 없음"}</strong>
              <span className="note-emotion">
                오늘의 감정:
                <span className="selected-emoji">
                  {emotionMap[selectedDay] || "😄"}
                </span>
              </span>
            </div>
            <hr className="note-divider" />
            <div className="note-preview-content">
              {noteMap[selectedDay].content || "내용이 없습니다."}
            </div>
            <div className="note-button-group">
              <button className="button-primary" onClick={() => setEditMode(true)}>
                수정
              </button>
              <Link to={`/Detail/${selectedDay}`} className="button-primary">상세</Link>
            </div>
          </div>
        ) : (
          <div className="note-box">
            <div className="note-top">
              <div className="note-fields">
                <label>제목</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="제목을 입력하세요"
                />
              </div>
              <div className="note-emotion">
                오늘의 감정:
                <span className="selected-emoji">
                  {emotionMap[selectedDay] || "😄"}
                </span>
              </div>
            </div>
            <div className="emotion-buttons">
              {emotions.map((emo) => (
                <button
                  key={emo}
                  onClick={() => handleEmotionChange(emo)}
                  className="emotion-btn"
                >
                  {emo}
                </button>
              ))}
            </div>
            <div className="note-fields">
              <label>내용</label>
              <textarea
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="내용을 입력하세요"
              />
            </div>
            <button className="button-primary" onClick={handleSaveNote}>
              저장
            </button>
          </div>
        )
      )}
    </div>
  );
}