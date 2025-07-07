import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyPage.css";

function extractEmoji(str) {
  if (!str) return null;
  const match = str.match(/[\p{Emoji}]/gu);
  if (match && match.length > 0) return match[0];
  if (/^([\uD800-\uDBFF][\uDC00-\uDFFF])/u.test(str)) {
    return str[0] + str[1];
  }
  const alt = str.match(/([\u231A-\uD83E\uDDFF])/);
  if (alt) return alt[0];
  return null;
}

const labelToKor = {
  "Very Positive": "아주 긍정적",
  "5 star": "아주 긍정적",
  "Positive": "긍정적",
  "4 star": "긍정적",
  "Neutral": "보통",
  "3 star": "보통",
  "Negative": "부정적",
  "2 star": "부정적",
  "Very Negative": "아주 부정적",
  "1 star": "아주 부정적"
};

function MyPage() {
  const [user, setUser] = useState(null);
  const [emotionHistory, setEmotionHistory] = useState([]);
  const [todayEmotion, setTodayEmotion] = useState(null);
  const [activeTab, setActiveTab] = useState("music");
  const navigate = useNavigate();

  const today = new Date();
  const todayString = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, "0")}.${String(today.getDate()).padStart(2, "0")}`;

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
    else navigate('/Login');
  }, [navigate]);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:4000/api/emotion?email=${encodeURIComponent(user.email)}`)
        .then(res => res.json())
        .then(data => {
          const emotions = Array.isArray(data.emotions) ? data.emotions : [];
          setEmotionHistory(emotions);
          const todayStr = new Date().toISOString().slice(0, 10);
          const todayLog = emotions.find(e => (e.date && e.date.slice(0,10) === todayStr));
          setTodayEmotion(todayLog || null);
        })
        .catch(() => {
          setEmotionHistory([]);
          setTodayEmotion(null);
        });
    }
  }, [user]);

  // 프로필 이미지 관리
  const [imgEditing, setImgEditing] = useState(false);
  const [editImg, setEditImg] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const handleImgChange = e => {
    const file = e.target.files[0];
    if (file) {
      setEditImg(file);
      setImgPreview(URL.createObjectURL(file));
    }
  };
  const handleImgSave = () => {
    if (editImg) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const newUser = { ...user, profileImg: e.target.result };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        setImgEditing(false);
        setImgPreview(null);
      };
      reader.readAsDataURL(editImg);
    }
  };

  if (!user) return null;

  // 💡 오늘 감정에 추천 음악/영화 직접 접근
  const noEmotion = !todayEmotion || !todayEmotion.recommendations;
  const songs = todayEmotion?.recommendations?.music || [];
  const movies = todayEmotion?.recommendations?.movie || [];

  return (
    <div className="Page-Design-MyMood">
      <div className="sidebar">
        <h1 className="page-title">My Page</h1>
        <div className="page-subtitle">프로필</div>
        <div className="profile">
          <div className="profile-img-select">
            <img
              src={imgPreview || user.profileImg || process.env.PUBLIC_URL + "/profile.png"}
              alt="profile"
              className="profile-img"
              style={{ marginBottom: '8px' }}
            />
            {imgEditing && (
              <label className="custom-file-label">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImgChange}
                  style={{ display: 'none' }}
                />
                <span className="file-upload-text">이미지 선택</span>
              </label>
            )}
          </div>
          <div className="username">{user.name}</div>
          <div className="email">{user.email}</div>
          {imgEditing ? (
            <>
              <button className="button" onClick={handleImgSave} style={{ marginBottom: "6px" }}>저장</button>
              <button className="button" onClick={() => { setImgEditing(false); setImgPreview(null); }}>취소</button>
            </>
          ) : (
            <button className="button" onClick={() => setImgEditing(true)}>
              프로필 이미지 변경
            </button>
          )}
          <div className="today-emotion">
            <div className="label">오늘의 감정</div>
            <div className="emoji">
              {todayEmotion
                ? (
                  <>
                    <span>{extractEmoji(todayEmotion.emotion)}</span>
                    <span className="today-emotion-label" style={{ marginLeft: 7 }}>
                      {labelToKor[todayEmotion.label] || "감정"}
                    </span>
                  </>
                )
                : "아직 진단 내역 없음"}
            </div>
            <div className="date">{todayString}</div>
          </div>
          <div className="buttons">
            <button className="button-2" onClick={() => {
              localStorage.removeItem('user');
              navigate('/Login');
            }}>로그아웃</button>
            <button className="button-1" onClick={() => navigate('/calendar')}>달력 확인</button>
          </div>
        </div>
      </div>

      <div className="content">
        {/* 상단 탭 버튼 */}
        <div className="tabs">
          <div
            className={`tab ${activeTab === "music" ? "active" : ""}`}
            onClick={() => setActiveTab("music")}
          >음악</div>
          <div
            className={`tab ${activeTab === "movie" ? "active" : ""}`}
            onClick={() => setActiveTab("movie")}
          >영화</div>
        </div>
        {/* 탭 컨텐츠 */}
        <div className="tab-content">
          {noEmotion ? (
            <div style={{ color: "#aaa", fontSize: "1rem", margin: "40px 0" }}>
              오늘의 감정 진단을 먼저 해주세요.
            </div>
          ) : (
            <div className="music-movie-list-wrap">
              {activeTab === "music" && songs.length > 0 && songs.map((item, idx) => (
                <div className="music-item" key={"song"+idx}>
                  <img src={item.image} alt={item.title || item.name} className="music-img" />
                  <div className="music-info">
                    <div className="music-title">{item.title}</div>
                    <div className="music-artist">{item.name}</div>
                    <div className="music-artist">{item.year && `(${item.year})`}</div>
                  </div>
                </div>
              ))}
              {activeTab === "movie" && movies.length > 0 && movies.map((item, idx) => (
                <div className="music-item" key={"movie"+idx}>
                  <img src={item.image} alt={item.title} className="music-img" />
                  <div className="music-info">
                    <div className="music-title">{item.title}</div>
                    <div className="music-artist">{item.director}</div>
                    <div className="music-artist">{item.year && `(${item.year})`}</div>
                  </div>
                </div>
              ))}
              {activeTab === "music" && songs.length === 0 && (
                <div style={{ color: "#bbb", margin: "30px 0" }}>추천 음악이 없습니다.</div>
              )}
              {activeTab === "movie" && movies.length === 0 && (
                <div style={{ color: "#bbb", margin: "30px 0" }}>추천 영화가 없습니다.</div>
              )}
            </div>
          )}
        </div>

        {/* 최근 감정 진단 기록 */}
        <div style={{ marginTop: "60px", textAlign: "left" }}>
          <h3 style={{ color: "#36795A", fontSize: "1.1rem", marginBottom: 10 }}>최근 감정 진단 기록</h3>
          {emotionHistory.length === 0 ? (
            <div style={{ color: "#888", margin: "10px 0" }}>기록이 없습니다.</div>
          ) : (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {emotionHistory.slice(0, 7).map((e, idx) => (
                <li key={idx} style={{ marginBottom: 8, borderBottom: "1px solid #eee", paddingBottom: 4 }}>
                  <span style={{ marginRight: 14 }}>{e.date ? e.date.slice(0, 10) : ""}</span>
                  <span>{extractEmoji(e.emotion)}</span>
                  <span style={{ marginLeft: 5 }}>{labelToKor[e.label] || "감정"}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyPage;
