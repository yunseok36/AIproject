import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyPage.css";
import { FaCamera } from "react-icons/fa";

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

  // 오늘의 추천 음악/영화(3개씩)
  const songs = todayEmotion?.recommendations?.music?.slice(0, 3) || [];
  const movies = todayEmotion?.recommendations?.movie?.slice(0, 3) || [];

  // 최근 감정별 박스(최신순 4개)
  const recentBoxes = emotionHistory.slice(0, 4);

  // 카드 공통 스타일
  const cardBase = {
    display: "flex", flexDirection: "column", alignItems: "center",
    minWidth: 220, maxWidth: 260, background: "#fff",
    borderRadius: 20, boxShadow: "0 2px 20px #f7e5b188",
    padding: "32px 24px", margin: "0 auto"
  };

  return (
    <div className="Page-Design-MyMood" style={{ display: "flex", minHeight: "100vh" }}>
      {/* ===== 사이드바(프로필) ===== */}
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
          <div className="email">{user.email}</div><br/>
          {imgEditing ? (
            <div style={{ display: "flex", gap: "10px", marginBottom: "3px" }}>
              <button className="button-img1" onClick={handleImgSave}>저장</button>
              <button className="button-img2" onClick={() => { setImgEditing(false); setImgPreview(null); }}>취소</button>
            </div>
          ) : (
            <button className="button profile-edit-btn" onClick={() => setImgEditing(true)}>
              <FaCamera style={{ marginRight: 6 }} /> 프로필 이미지 변경
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

      {/* ===== 메인 콘텐츠 ===== */}
      <div className="content" style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        maxWidth: 900,
        margin: "0 auto"
      }}>
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

        {/* 오늘의 추천 (크게, 3개까지 한 줄, 이미지 더 큼) */}
        {activeTab === "music" && (
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontWeight: 900, color: "#594800", fontSize: "1.38rem", marginBottom: 22, letterSpacing: "0.2px" }}>
              오늘의 추천 음악
            </div>
            <div style={{ display: "flex", gap: "40px", justifyContent: "center" }}>
              {songs.length === 0 ? (
                <div style={{ color: "#bbb", fontSize: "1.1rem", padding: 44 }}>음악 추천이 없습니다.</div>
              ) : (
                songs.map((song, idx) => (
                  <div key={idx} style={{
                    ...cardBase,
                    background: "#fffbe4",
                  }}>
                    {/* 앨범 이미지에 onClick 이벤트 핸들러 추가 */}
                    <img
                      src={song.image}
                      alt={song.title}
                      onClick={() => {
                        if (song.youtubeLink) {
                          window.open(song.youtubeLink, '_blank', 'noopener,noreferrer');
                        } else {
                          const searchQuery = encodeURIComponent(`${song.name} ${song.title} official`);
                          window.open(`https://www.youtube.com/results?search_query=${searchQuery}`, '_blank', 'noopener,noreferrer');
                        }
                      }}
                      style={{
                        width: 140, 
                        height: 140, 
                        borderRadius: 16, 
                        marginBottom: 20, 
                        background: "#fff",
                        boxShadow: "0 2px 24px #f8eebb77",
                        cursor: "pointer" // 클릭 가능함을 표시
                      }}
                    />
                    <div style={{
                      fontWeight: 800,
                      fontSize: "1.25rem",
                      color: "#594800",
                      marginBottom: 9,
                      textAlign: "center"
                    }}>{song.title}</div>
                    <div style={{
                      fontSize: "1.08rem", color: "#bba82d", fontWeight: 700, textAlign: "center"
                    }}>{song.name}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
        {activeTab === "movie" && (
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontWeight: 900, color: "#472769", fontSize: "1.38rem", marginBottom: 22, letterSpacing: "0.2px" }}>
              오늘의 추천 영화
            </div>
            <div style={{ display: "flex", gap: "40px", justifyContent: "center" }}>
              {movies.length === 0 ? (
                <div style={{ color: "#bbb", fontSize: "1.1rem", padding: 44 }}>영화 추천이 없습니다.</div>
              ) : (
                movies.map((movie, idx) => (
                  <div key={idx} style={{
                    ...cardBase,
                    background: "#f7f1ff",
                  }}>
                    {/* 영화 포스터 이미지에 onClick 이벤트 핸들러 추가 */}
                    <img
                      src={movie.image}
                      alt={movie.title}
                      onClick={() => {
                        if (movie.trailerLink) {
                          window.open(movie.trailerLink, '_blank', 'noopener,noreferrer');
                        } else {
                          const searchQuery = encodeURIComponent(`${movie.title} ${movie.director} trailer 예고편`);
                          window.open(`https://www.youtube.com/results?search_query=${searchQuery}`, '_blank', 'noopener,noreferrer');
                        }
                      }}
                      style={{
                        width: 140, 
                        height: 140, 
                        borderRadius: 16, 
                        marginBottom: 20, 
                        background: "#fff",
                        boxShadow: "0 2px 24px #dfc8f877",
                        cursor: "pointer" // 클릭 가능함을 표시
                      }}
                    />
                    <div style={{
                      fontWeight: 800,
                      fontSize: "1.25rem",
                      color: "#472769",
                      marginBottom: 9,
                      textAlign: "center"
                    }}>{movie.title}</div>
                    <div style={{
                      fontSize: "1.08rem", color: "#a387c9", fontWeight: 700, textAlign: "center"
                    }}>{movie.director}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* 최근 감정별 추천: 탭별 분리! */}
        <div style={{ marginTop: 10, marginBottom: 36 }}>
          <div style={{
            fontWeight: 700, fontSize: "1.11rem", color: "#36795A",
            marginBottom: 20, marginLeft: 4
          }}>
            {activeTab === "music" ? "최근 감정별 추천 음악" : "최근 감정별 추천 영화"}
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "32px"
          }}>
            {recentBoxes.length === 0 ? (
              <div style={{
                color: "#aaa", background: "#faf8e6", borderRadius: 14,
                padding: "30px 20px", minHeight: 140, gridColumn: "1/-1"
              }}>
                기록이 없습니다.
              </div>
            ) : (
              recentBoxes.map((e, idx) => {
                // 음악/영화 각각만!
                const musics = Array.isArray(e.recommendations?.music) && activeTab === "music" ? e.recommendations.music.slice(0, 3) : [];
                const moviesBox = Array.isArray(e.recommendations?.movie) && activeTab === "movie" ? e.recommendations.movie.slice(0, 3) : [];
                return (
                  <div key={idx} style={{
                    background: "#fcf7e7",
                    borderRadius: 20,
                    boxShadow: "0 2px 12px #ece8d255",
                    padding: "22px 24px 16px 24px",
                    minHeight: 200,
                    display: "flex",
                    flexDirection: "column"
                  }}>
                    <div style={{
                      display: "flex", alignItems: "center", gap: 12, marginBottom: 12
                    }}>
                      <span style={{ color: "#5c5907", fontWeight: 700, minWidth: 88 }}>
                        {e.date ? e.date.slice(0, 10) : ""}
                      </span>
                      <span style={{ fontSize: "1.23rem", marginRight: 8 }}>{extractEmoji(e.emotion)}</span>
                      <span style={{
                        color: "#b69328", fontWeight: 700, marginRight: 9
                      }}>
                        {labelToKor[e.label] || "감정"}
                      </span>
                    </div>
                    {/* 음악/영화 */}
                    {activeTab === "music" && (
                      <>
                        <div style={{
                          fontWeight: 700, fontSize: "1.06rem", color: "#659100", marginBottom: 20, marginTop: 2
                        }}>
                          음악 추천
                        </div>
                        <div style={{
                          display: "flex", gap: 30, marginBottom: 8, justifyContent: "center"
                        }}>
                          {musics.length === 0 ? (
                            <div style={{ color: "#bbb", fontSize: "0.95rem" }}>없음</div>
                          ) : (
                            musics.map((item, i) => (
                              <div key={i} style={{
                                display: "flex", flexDirection: "column", alignItems: "center",
                                width: 72, minWidth: 72
                              }}>
                                <img src={item.image} alt={item.title} style={{
                                  width: 50, height: 50, borderRadius: 9, background: "#fff", marginBottom: 7
                                }} />
                                <div style={{
                                  fontWeight: 700, fontSize: "0.96rem", textAlign: "center",
                                  color: "#403c23", marginBottom: 0, wordBreak: "keep-all"
                                }}>{item.title}</div>
                                <div style={{
                                  fontSize: "0.84rem", color: "#958e70", textAlign: "center"
                                }}>{item.name}</div>
                              </div>
                            ))
                          )}
                        </div>
                      </>
                    )}
                    {activeTab === "movie" && (
                      <>
                        <div style={{
                          fontWeight: 700, fontSize: "1.06rem", color: "#5f388a", marginBottom: 4, marginTop: 2
                        }}>
                          영화 추천
                        </div>
                        <div style={{
                          display: "flex", gap: 10, marginBottom: 8, justifyContent: "center"
                        }}>
                          {moviesBox.length === 0 ? (
                            <div style={{ color: "#bbb", fontSize: "0.95rem" }}>없음</div>
                          ) : (
                            moviesBox.map((item, i) => (
                              <div key={i} style={{
                                display: "flex", flexDirection: "column", alignItems: "center",
                                width: 72, minWidth: 72
                              }}>
                                <img src={item.image} alt={item.title} style={{
                                  width: 50, height: 50, borderRadius: 9, background: "#fff", marginBottom: 7
                                }} />
                                <div style={{
                                  fontWeight: 700, fontSize: "0.96rem", textAlign: "center",
                                  color: "#403c23", marginBottom: 0, wordBreak: "keep-all"
                                }}>{item.title}</div>
                                <div style={{
                                  fontSize: "0.84rem", color: "#958e70", textAlign: "center"
                                }}>{item.director}</div>
                              </div>
                            ))
                          )}
                        </div>
                      </>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
