import { useParams, useNavigate } from "react-router-dom";
import useCalendarStore from "../store/calendarStore";
import "./Detail.css";

export default function Detail() {
  const { date } = useParams();
  const navigate = useNavigate();
  const { noteMap, emotionMap, deleteNote } = useCalendarStore();

  const noteExists = noteMap[date];
  const note = noteExists || { title: "", content: "" };
  const emotion = emotionMap[date] || "😄";

  if (!noteExists) {
    return (
      <div className="detail-container">
        <p>데이터가 없습니다.</p>
        <button onClick={() => navigate(-1)} className="button-primary">
          뒤로가기
        </button>
      </div>
    );
  }

  const handleDelete = () => {
    deleteNote(date);
    navigate(-1);
  };

  return (
    <div className="detail-container">
      <div className="section-title">기록 상세</div>

      <div className="detail-date">{date}</div>

      <div className="detail-emotion">
        오늘의 감정: <span className="selected-emoji">{emotion}</span>
      </div>

      <hr className="note-divider" />

      <div className="detail-content">
        <strong>{note.title || "제목 없음"}</strong>
        <p>{note.content || "내용이 없습니다."}</p>
      </div>

      <div className="recommend-section">
        <div className="recommend-title">추천받은 콘텐츠</div>

        <div className="recommend-group">
          <div className="recommend-label">음악</div>
          <div className="recommend-tags">
            <span>#Personal</span>
            <span>#Pink+White</span>
            <span>#Like_Him</span>
          </div>
        </div>

        <div className="recommend-group">
          <div className="recommend-label">영화</div>
          <div className="recommend-tags">
            <span>#Personal</span>
            <span>#Pink+White</span>
            <span>#Like_Him</span>
          </div>
        </div>

        <div className="recommend-group">
          <div className="recommend-label">드라마</div>
          <div className="recommend-tags">
            <span>#Personal</span>
            <span>#Pink+White</span>
            <span>#Like_Him</span>
          </div>
        </div>
      </div>

      <div className="detail-footer">
        <button onClick={() => navigate(-1)} className="button-primary">
          뒤로가기
        </button>
        <button onClick={handleDelete} className="button-danger">
          기록 삭제
        </button>
      </div>
    </div>
  );
}