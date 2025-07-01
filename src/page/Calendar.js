import React, { useState } from "react";
import "./Calendar.css";

const emotions = ["😊", "😢", "😠", "😱", "😌"];

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [emotionMap, setEmotionMap] = useState({});
  const [noteMap, setNoteMap] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editMode, setEditMode] = useState(false);

  const getDaysInMonth = (year, month) =>
    new Date(year, month + 1, 0).getDate();

  const handlePrev = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    setSelectedDay(null);
  };

  const handleNext = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    setSelectedDay(null);
  };

  const handleSelectDay = (year, month, day) => {
    const key = `${year}-${month + 1}-${day}`;
    setSelectedDay(key);
    setTitle(noteMap[key]?.title || "");
    setContent(noteMap[key]?.content || "");
    setEditMode(false); // 처음 선택 시에는 미리보기부터
  };

  const handleEmotionChange = (emoji) => {
    if (selectedDay) {
      setEmotionMap({
        ...emotionMap,
        [selectedDay]: emoji,
      });
    }
  };

  const handleSaveNote = () => {
    setNoteMap({
      ...noteMap,
      [selectedDay]: { title, content },
    });
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
    const key = `${year}-${month + 1}-${d}`;
    cells.push(
      <div
        key={key}
        className={`day-cell ${emotionMap[key] ? "has-emoji" : ""}`}
        onClick={() => handleSelectDay(year, month, d)}
      >
        <div className="emoji">{emotionMap[key]}</div>
        <div className="day-number">{d}</div>
      </div>
    );
  }

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
          <button onClick={handleNext}>▶</button>
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
                  {emotionMap[selectedDay] || "🙂"}
                </span>
              </span>
            </div>
            <hr className="note-divider" />
            <div className="note-preview-content">
              {noteMap[selectedDay].content || "내용이 없습니다."}
            </div>
            <button className="button-primary" onClick={() => setEditMode(true)}>
              수정
            </button>
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
                  {emotionMap[selectedDay] || "🙂"}
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