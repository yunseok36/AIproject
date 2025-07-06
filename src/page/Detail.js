import { useParams, useNavigate } from "react-router-dom";
import useCalendarStore from "../store/calendarStore";
import "./Detail.css";

export default function Detail() {
  const { date } = useParams();
  const navigate = useNavigate();
  const { noteMap, emotionMap, deleteNote, hasHydrated } = useCalendarStore();

  if (!hasHydrated) {
    return (
      <div className="detail-container">
        <p>불러오는 중...</p>
      </div>
    );
  }

  const noteExists = noteMap[date];
  const note = noteExists || { title: "", content: "" };
  const emotion = emotionMap[date] || "🙂";

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

  const recommendData = [
    {
      label: "음악",
      tags: ["#Personal", "#Pink+White", "#Like_Him"],
    },
    {
      label: "영화",
      tags: ["#Personal", "#Pink+White", "#Like_Him"],
    },
    {
      label: "드라마",
      tags: ["#Personal", "#Pink+White", "#Like_Him"],
    },
  ];

  return (
    <div className="detail-container">
      <div className="section-title" style={{ textAlign: "center" }}>
        {note.title || "제목 없음"}
      </div>

      <div className="detail-date"><strong>{date}</strong></div>

      <div className="detail-emotion">
        오늘의 감정: <span className="selected-emoji">{emotion}</span>
      </div>

      <hr className="note-divider" />

      <div className="detail-content">
        <p>{note.content || "내용이 없습니다."}</p>
      </div>

      <hr className="note-divider" />

      <div className="recommend-section">
        <div className="recommend-title">추천받은 콘텐츠</div>

        {recommendData.map((item) => (
          <div key={item.label} className="recommend-group">
            <div className="recommend-label">{item.label}</div>
            <div className="recommend-tags">
              {item.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="detail-footer">
        <button onClick={handleDelete} className="button-primary">
          기록 삭제
        </button>
        <button onClick={() => navigate(-1)} className="button-primary">
          뒤로가기
        </button>
      </div>
    </div>
  );
}